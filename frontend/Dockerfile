FROM node:22-alpine
WORKDIR /app
EXPOSE 5173
# Starts Vite if package.json exists; otherwise stays idle while you scaffold it
CMD ["sh", "-c", "if [ -f package.json ]; then npm run dev -- --host 0.0.0.0; else tail -f /dev/null; fi"]
