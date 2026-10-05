# Interactions & Animations Documentation

## Overview

This directory contains subtle, purposeful animations and interaction states for the Learn platform. All animations are designed to be minimal and enhance UX without being distracting.

## Files

- `animations.css` - Core animation classes and keyframes

## Animation Principles

✅ **Subtle**: All animations are fast (150-300ms) and minimal  
✅ **Purposeful**: Every animation serves a UX purpose  
✅ **Performant**: Uses CSS transforms and opacity only  
✅ **Accessible**: Respects `prefers-reduced-motion`  
❌ **No over-animation**: Avoid excessive motion

## Available Animation Classes

### Fade Animations
- `.animate-fade-in` - Fade in (200ms)
- `.animate-fade-out` - Fade out (200ms)

### Slide Animations
- `.animate-slide-in-right` - Slide from right (200ms)
- `.animate-slide-in-left` - Slide from left (200ms)
- `.animate-slide-up` - Slide up (200ms)
- `.animate-slide-down` - Slide down (200ms)

### Scale Animations
- `.animate-scale-in` - Scale in (150ms)
- `.animate-scale-out` - Scale out (150ms)

### Progress Animation
- `.animate-progress` - Progress bar fill (500ms)

### Loading States
- `.animate-pulse` - Subtle pulse (2s infinite)
- `.animate-shimmer` - Shimmer effect for skeletons (1.5s)

### Delays
- `.delay-100` to `.delay-500` - Staggered animation delays

## Interaction States

### Hover States
```jsx
<div className="hover-lift">Lifts on hover</div>
<div className="hover-scale">Scales on hover</div>
```

### Focus States
```jsx
<button className="focus-ring">Default focus ring</button>
<input className="focus-ring-subtle">Subtle focus ring</input>
```

### Active States
```jsx
<button className="active-scale">Scales down on click</button>
```

### Disabled States
```jsx
<button className="disabled">Disabled button</button>
```

## Component-Specific Animations

### Toast Notifications
- `.toast-enter` - Slide in from right
- `.toast-exit` - Fade out

### Modal
- `.modal-backdrop` - Fade in backdrop
- `.modal-content` - Scale in content

### Dropdown
- `.dropdown-enter` - Slide down
- `.dropdown-exit` - Fade out

### Sidebar
- `.sidebar-transition` - Smooth width/transform transitions

## Transition Durations

- `.transition-fast` - 150ms
- `.transition-normal` - 200ms (default)
- `.transition-slow` - 300ms

## Usage Examples

### Button with Loading State
```jsx
<Button loading={isLoading} variant="primary">
  {isLoading ? 'Saving...' : 'Save'}
</Button>
```

### Card with Hover Effect
```jsx
<div className="hover-lift transition-normal">
  <CourseCard course={course} />
</div>
```

### Animated Progress Bar
```jsx
<ProgressBar value={progress} animate={true} />
```

### Modal with Animation
```jsx
<Modal open={isOpen} onClose={handleClose}>
  <div className="modal-content">
    Content here
  </div>
</Modal>
```

### Toast Notification
```jsx
const { success, error } = useToast()

success('Changes saved!')
error('Something went wrong')
```

## Accessibility

All animations respect user preferences. To disable animations for users who prefer reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Custom Scrollbar

Subtle custom scrollbar for better aesthetics:

```jsx
<div className="custom-scrollbar overflow-y-auto">
  Content with custom scrollbar
</div>
```

## Performance Tips

1. **Use transforms instead of position changes**
   - ✅ `transform: translateX(20px)`
   - ❌ `left: 20px`

2. **Use opacity instead of visibility**
   - ✅ `opacity: 0`
   - ❌ `visibility: hidden`

3. **Avoid animating layout properties**
   - ✅ `transform`, `opacity`
   - ❌ `width`, `height`, `margin`, `padding`

4. **Use will-change sparingly**
   ```css
   .will-animate {
     will-change: transform, opacity;
   }
   ```

## Adding New Animations

When adding new animations:

1. Keep duration under 300ms
2. Use easing functions (ease-out for entering, ease-in for exiting)
3. Test on slow devices
4. Ensure accessibility
5. Document purpose

Example:
```css
@keyframes subtleBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

.animate-bounce {
  animation: subtleBounce 0.3s ease-out;
}
```

## Component Integration

Most components have built-in interaction states:

- **Button**: Loading state, active scale, focus ring
- **Input**: Focus ring, error state, disabled state
- **Select**: Focus ring, disabled state
- **Modal**: Backdrop fade, content scale
- **Dropdown**: Slide animation
- **Sidebar**: Smooth transitions
- **ProgressBar**: Animated fill
- **Toast**: Slide in/out animations

## Testing Animations

To test animations:

1. Open DevTools Performance tab
2. Record interactions
3. Check for layout thrashing
4. Verify frame rate stays at 60fps
5. Test on mobile devices

## Browser Support

All animations use standard CSS properties supported by:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Troubleshooting

### Animation not working?
- Check if CSS file is imported
- Verify class name is correct
- Check for conflicting styles

### Animation too slow?
- Reduce duration
- Use `will-change` property
- Optimize with hardware acceleration

### Animation janky?
- Avoid animating layout properties
- Use transforms instead
- Reduce number of animated elements
