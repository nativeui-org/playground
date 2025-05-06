import * as React from "react"
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Platform,
  Animated,
  PanResponder,
  Dimensions,
  StyleSheet,
  Easing,
  AccessibilityInfo,
  findNodeHandle,
  ScrollView,
} from "react-native"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { cn } from "@/lib/utils"

interface DrawerProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  snapPoints?: number[]
  initialSnapIndex?: number
  className?: string
  contentClassName?: string
  preventClose?: boolean
  accessibilityLabel?: string
  accessibilityHint?: string
}

const { height: initialScreenHeight } = Dimensions.get("window")
const DEFAULT_SNAP_POINTS = [0.5, 0.9] // 0.5 = 50% of screen height, 0.9 = 90% of screen height

export const DrawerContext = React.createContext<{ 
  animateClose: () => void,
  blockClose: () => void,
  unblockClose: () => void,
}>({
  animateClose: () => {},
  blockClose: () => {},
  unblockClose: () => {},
})

export const useDrawer = () => React.useContext(DrawerContext)

const Drawer = React.forwardRef<View, DrawerProps>(
  ({ 
    open, 
    onClose, 
    children, 
    title,
    snapPoints = DEFAULT_SNAP_POINTS,
    initialSnapIndex = 0,
    className,
    contentClassName,
    preventClose = false,
    accessibilityLabel = "Bottom drawer",
    accessibilityHint = "Swipe up to expand, swipe down to dismiss",
  }, ref) => {
    const [screenHeight, setScreenHeight] = React.useState(initialScreenHeight)
    const [closeBlocked, setCloseBlocked] = React.useState(preventClose)
    const [scrollEnabled, setScrollEnabled] = React.useState(true)
    const drawerRef = React.useRef<View>(null)
    const insets = useSafeAreaInsets()
    
    React.useEffect(() => {
      const subscription = Dimensions.addEventListener(
        "change",
        ({ window }) => {
          if (window.height) setScreenHeight(window.height);
        }
      );
      
      return () => subscription.remove();
    }, []);
    
    const snapPointsPixels = React.useMemo(() => snapPoints.map(point => 
      screenHeight - (screenHeight * point)
    ), [snapPoints, screenHeight])
    
    const activeSnapIndex = React.useRef(initialSnapIndex)
    const translateY = React.useRef(new Animated.Value(screenHeight)).current
    const backdropOpacity = React.useRef(new Animated.Value(0)).current
    const isClosing = React.useRef(false)
    const animationsRunning = React.useRef(0)
    
    const incrementAnimation = React.useCallback(() => {
      animationsRunning.current += 1
    }, [])
    
    const decrementAnimation = React.useCallback(() => {
      animationsRunning.current = Math.max(0, animationsRunning.current - 1)
    }, [])
    
    React.useEffect(() => {
      if (open && drawerRef.current) {
        const handle = findNodeHandle(drawerRef.current)
        if (handle) {
          setTimeout(() => {
            AccessibilityInfo.setAccessibilityFocus(handle)
          }, 500)
        }
      }
    }, [open])
    
    const blockClose = React.useCallback(() => {
      setCloseBlocked(true)
    }, [])
    
    const unblockClose = React.useCallback(() => {
      setCloseBlocked(false)
    }, [])
    
    const animateOpen = React.useCallback(() => {
      if (animationsRunning.current > 0) return
      
      translateY.setValue(screenHeight)
      backdropOpacity.setValue(0)
      isClosing.current = false
      
      incrementAnimation()
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }).start(decrementAnimation)
      
      incrementAnimation()
      Animated.spring(translateY, {
        toValue: snapPointsPixels[initialSnapIndex],
        useNativeDriver: true,
        velocity: 3,
        tension: 120,
        friction: 22,
      }).start(decrementAnimation)
      
      activeSnapIndex.current = initialSnapIndex
    }, [backdropOpacity, translateY, snapPointsPixels, initialSnapIndex, screenHeight, incrementAnimation, decrementAnimation])
    
    const animateClose = React.useCallback(() => {
      if (isClosing.current || closeBlocked) return
      
      isClosing.current = true
      
      incrementAnimation()
      Animated.spring(translateY, {
        toValue: screenHeight,
        useNativeDriver: true,
        friction: 26,
        tension: 100,
        velocity: 0.5,
      }).start((result) => {
        decrementAnimation()
        if (result.finished && isClosing.current) {
          onClose()
          isClosing.current = false
        }
      })
      
      incrementAnimation()
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 280,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
        delay: 100,
      }).start(decrementAnimation)
    }, [backdropOpacity, translateY, onClose, screenHeight, closeBlocked, incrementAnimation, decrementAnimation])
    
    React.useEffect(() => {
      if (open) {
        isClosing.current = false
      }
    }, [open])
    
    React.useEffect(() => {
      if (open && !isClosing.current) {
        animateOpen()
      }
    }, [open, animateOpen])
    
    React.useEffect(() => {
      if (!open && !isClosing.current) {
        animateClose()
      }
    }, [open, animateClose])
    
    React.useEffect(() => {
      setCloseBlocked(preventClose)
    }, [preventClose])
    
    const animateToSnapPoint = (index: number, velocity = 0) => {
      if (index < 0 || index >= snapPointsPixels.length) return
      
      activeSnapIndex.current = index
      
      incrementAnimation()
      Animated.spring(translateY, {
        toValue: snapPointsPixels[index],
        useNativeDriver: true,
        velocity: velocity,
        tension: 120,
        friction: 22,
      }).start(decrementAnimation)
      
      setScrollEnabled(index === snapPointsPixels.length - 1)
    }
    
    const getTargetSnapIndex = (currentY: number, velocity: number, dragDirection: 'up' | 'down') => {
      const isDraggingDown = dragDirection === 'down'
      
      if (activeSnapIndex.current === snapPointsPixels.length - 1 && isDraggingDown) {
        return snapPointsPixels.length - 2
      }
      
      if (activeSnapIndex.current === 1 && isDraggingDown && velocity > 0.3) {
        return 0
      }
      
      if (activeSnapIndex.current === 0 && isDraggingDown && velocity > 0.5) {
        return -1
      }
      
      if (currentY > snapPointsPixels[0] + 100) {
        return -1
      }
      
      if (dragDirection === 'up' && velocity > 0.3) {
        const nextIndex = Math.min(activeSnapIndex.current + 1, snapPointsPixels.length - 1)
        return nextIndex
      }
      
      let closestIndex = 0
      let minDistance = Math.abs(currentY - snapPointsPixels[0])
      
      for (let i = 1; i < snapPointsPixels.length; i++) {
        const distance = Math.abs(currentY - snapPointsPixels[i])
        if (distance < minDistance) {
          minDistance = distance
          closestIndex = i
        }
      }
      
      return closestIndex
    }
    
    const isScrollingRef = React.useRef(false);
    
    const panResponder = React.useMemo(() => {
      let startY = 0;
      const maxDragPoint = snapPointsPixels[snapPointsPixels.length - 1];
      
      return PanResponder.create({
        onStartShouldSetPanResponder: (_, gestureState) => {
          return gestureState.y0 < 100;
        },
        onMoveShouldSetPanResponder: (_, {dy, moveY, y0}) => {
          if (isScrollingRef.current) return false;
          
          if (
            activeSnapIndex.current === snapPointsPixels.length - 1 && 
            dy > 0 && 
            moveY > 100
          ) {
            return false;
          }
          
          return Math.abs(dy) > 5;
        },
        onMoveShouldSetPanResponderCapture: (_, {dy}) => {
          return activeSnapIndex.current === 0 && dy > 10;
        },
        
        onPanResponderGrant: (_, {y0}) => {
          startY = y0;
          translateY.stopAnimation();
          isScrollingRef.current = false;
        },
        
        onPanResponderMove: (_, {dy}) => {
          if (isClosing.current) return;
          
          const currentSnapY = snapPointsPixels[activeSnapIndex.current];
          let newY = currentSnapY + dy;
          
          if (closeBlocked && newY > snapPointsPixels[0]) {
            newY = snapPointsPixels[0];
          } else if (newY < maxDragPoint) {
            const overscroll = maxDragPoint - newY;
            const resistedOverscroll = -Math.log10(1 + overscroll * 0.1) * 10;
            newY = maxDragPoint + resistedOverscroll;
          }
          
          translateY.setValue(newY);
        },
        
        onPanResponderRelease: (_, {dy, vy, moveY}) => {
          if (isClosing.current) return;
          
          const dragDirection = dy > 0 ? 'down' : 'up'
          const currentY = snapPointsPixels[activeSnapIndex.current] + dy
          const absVelocity = Math.abs(vy)
          
          const targetIndex = getTargetSnapIndex(
            currentY, 
            absVelocity,
            dragDirection
          )
          
          if (targetIndex === -1) {
            if (!closeBlocked) {
              animateClose()
            } else {
              animateToSnapPoint(0)
            }
          } else {
            animateToSnapPoint(targetIndex, vy)
          }
        },
        
        onPanResponderTerminationRequest: () => true,
        onPanResponderTerminate: () => {
          isScrollingRef.current = false;
        },
      });
    }, [snapPointsPixels, onClose, translateY, animateClose, closeBlocked, incrementAnimation, decrementAnimation]);
    
    if (!open && !isClosing.current) return null
    
    return (
      <DrawerContext.Provider value={{ animateClose, blockClose, unblockClose }}>
        <Modal
          visible={true}
          transparent
          animationType="none"
          statusBarTranslucent
          onRequestClose={() => {
            if (!closeBlocked) {
              animateClose()
            }
          }}
        >
          <View className="flex-1">
            <Animated.View 
              style={[styles.backdrop, { opacity: backdropOpacity }]}
              accessibilityRole="button"
              accessibilityLabel="Close drawer"
              accessibilityHint="Double tap to close the drawer"
            >
              <TouchableWithoutFeedback 
                onPress={() => {
                  if (!closeBlocked) {
                    animateClose()
                  }
                }}
              >
                <View style={StyleSheet.absoluteFillObject} />
              </TouchableWithoutFeedback>
            </Animated.View>
            
            <Animated.View
              style={[
                styles.drawerContainer,
                { transform: [{ translateY }] }
              ]}
              className={cn(
                "absolute bottom-0 left-0 right-0 bg-popover rounded-t-xl overflow-hidden",
                Platform.OS === "ios" ? "ios:shadow-xl" : "android:elevation-24",
                contentClassName
              )}
              ref={drawerRef}
              accessibilityRole="adjustable"
              accessibilityLabel={accessibilityLabel}
              accessibilityHint={accessibilityHint}
              accessible={true}
              importantForAccessibility="yes"
            >
              <View {...panResponder.panHandlers}>
                <View className="w-full items-center py-2">
                  <View className="w-10 h-1 rounded-full bg-muted-foreground/30" />
                </View>
              
                {title && (
                  <View className="px-4 pt-1 pb-3 border-b border-border">
                    <Text className="text-xl font-medium text-center text-foreground">
                      {title}
                    </Text>
                  </View>
                )}
              </View>
              
              <ScrollView 
                ref={ref as any}
                className="flex-1"
                scrollEnabled={scrollEnabled}
                showsVerticalScrollIndicator={true}
                bounces={activeSnapIndex.current === snapPointsPixels.length - 1}
                onScrollBeginDrag={() => {
                  isScrollingRef.current = true;
                }}
                onScrollEndDrag={() => {
                  isScrollingRef.current = false;
                }}
              >
                <SafeAreaView
                  edges={['bottom', 'left', 'right']}
                  className="flex-1"
                  style={{ paddingBottom: Math.max(20, insets.bottom) }}
                >
                  {children}
                </SafeAreaView>
              </ScrollView>
            </Animated.View>
          </View>
        </Modal>
      </DrawerContext.Provider>
    )
  }
)

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  drawerContainer: {
    height: Dimensions.get('window').height,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 24,
  },
})

Drawer.displayName = "Drawer"

export { Drawer } 