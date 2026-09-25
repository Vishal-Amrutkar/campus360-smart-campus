#!/bin/bash
# Convert to WebP for desktop (max 1280px) and mobile (max 720px)

mkdir -p public/frames/desktop public/frames/mobile

# Desktop: 15fps (every 2nd frame of 30fps), max 1280px width
ffmpeg -i input.mp4 -vf "fps=15,scale=1280:-2" -c:v libwebp -quality 75 public/frames/desktop/frame_%04d.webp

# Mobile: 15fps, max 720px width 
ffmpeg -i input.mp4 -vf "fps=15,scale=720:-2" -c:v libwebp -quality 70 public/frames/mobile/frame_%04d.webp

echo "Conversion complete."
