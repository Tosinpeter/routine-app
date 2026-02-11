/**
 * Performance Monitoring Utilities
 * 
 * These utilities help track and measure app performance in development and production.
 */

import { InteractionManager } from 'react-native';

/**
 * Measure time taken by a function
 */
export const measurePerformance = async <T>(
  name: string,
  fn: () => T | Promise<T>
): Promise<T> => {
  const start = performance.now();
  
  try {
    const result = await fn();
    const end = performance.now();
    const duration = end - start;
    
    console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
    
    return result;
  } catch (error) {
    const end = performance.now();
    const duration = end - start;
    console.error(`[Performance] ${name} failed after ${duration.toFixed(2)}ms`, error);
    throw error;
  }
};

/**
 * Track component mount time
 */
export const useComponentPerformance = (componentName: string) => {
  const mountTime = performance.now();
  
  return {
    logMountTime: () => {
      const duration = performance.now() - mountTime;
      console.log(`[Component] ${componentName} mounted in ${duration.toFixed(2)}ms`);
    },
    
    measureRender: (renderName: string) => {
      const start = performance.now();
      return () => {
        const duration = performance.now() - start;
        console.log(`[Render] ${componentName}.${renderName}: ${duration.toFixed(2)}ms`);
      };
    },
  };
};

/**
 * Wait for interactions to complete before measuring
 */
export const measureAfterInteraction = async <T>(
  name: string,
  fn: () => T | Promise<T>
): Promise<T> => {
  return new Promise((resolve, reject) => {
    InteractionManager.runAfterInteractions(async () => {
      try {
        const result = await measurePerformance(name, fn);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  });
};

/**
 * Performance marks for complex flows
 */
class PerformanceTracker {
  private marks: Map<string, number> = new Map();
  
  mark(name: string) {
    this.marks.set(name, performance.now());
  }
  
  measure(startMark: string, endMark: string, label?: string) {
    const start = this.marks.get(startMark);
    const end = this.marks.get(endMark);
    
    if (start === undefined || end === undefined) {
      console.warn(`[Performance] Missing marks for measurement: ${startMark} -> ${endMark}`);
      return;
    }
    
    const duration = end - start;
    const measureLabel = label || `${startMark} → ${endMark}`;
    console.log(`[Performance] ${measureLabel}: ${duration.toFixed(2)}ms`);
    
    return duration;
  }
  
  clear(markName?: string) {
    if (markName) {
      this.marks.delete(markName);
    } else {
      this.marks.clear();
    }
  }
}

export const performanceTracker = new PerformanceTracker();

/**
 * Frame rate monitor
 */
export class FPSMonitor {
  private frames: number[] = [];
  private rafId: number | null = null;
  private lastTime: number = 0;
  
  start() {
    this.lastTime = performance.now();
    this.loop();
  }
  
  private loop = () => {
    const currentTime = performance.now();
    const delta = currentTime - this.lastTime;
    
    if (delta > 0) {
      const fps = 1000 / delta;
      this.frames.push(fps);
      
      // Keep only last 60 frames (1 second at 60fps)
      if (this.frames.length > 60) {
        this.frames.shift();
      }
    }
    
    this.lastTime = currentTime;
    this.rafId = requestAnimationFrame(this.loop);
  };
  
  getAverageFPS(): number {
    if (this.frames.length === 0) return 0;
    const sum = this.frames.reduce((a, b) => a + b, 0);
    return sum / this.frames.length;
  }
  
  stop() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    
    const avgFPS = this.getAverageFPS();
    console.log(`[FPS Monitor] Average FPS: ${avgFPS.toFixed(2)}`);
    
    return avgFPS;
  }
}

/**
 * Memory usage tracking (development only)
 */
export const logMemoryUsage = () => {
  if (__DEV__ && (performance as any).memory) {
    const memory = (performance as any).memory;
    console.log('[Memory Usage]', {
      usedJSHeapSize: `${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`,
      totalJSHeapSize: `${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB`,
      jsHeapSizeLimit: `${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`,
    });
  }
};

/**
 * Navigation performance tracking
 */
export const measureScreenNavigation = (screenName: string) => {
  const startTime = performance.now();
  
  return () => {
    const duration = performance.now() - startTime;
    console.log(`[Navigation] ${screenName} ready in ${duration.toFixed(2)}ms`);
  };
};
