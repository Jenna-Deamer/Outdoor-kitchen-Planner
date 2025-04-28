# Kitchen Planner Tool

A proof-of-concept kitchen layout planner built with **ReactJS** and **Three.js**, designed for an **XR (Extended Reality) class project** over a 10-week period.  
Users can select a counter model (straight or L-shape), add basic kitchen components (cabinet, fridge), move them around on the counter, and view the design in **Augmented Reality (AR)**.

All 3D models were created using **Tinkercad** and are intentionally simple to focus on interaction and functionality rather than realism.

> **Live Demo:** [outdoor-kitchen-planner.vercel.app](https://outdoor-kitchen-planner.vercel.app/)

---

## Features

- **Counter Selection:** Choose between straight and L-shaped counters.
- **Add and Move Models:** Place and rearrange cabinets and fridges on the counter.
- **Augmented Reality Preview:** View your kitchen design in real-world space using AR-supported devices.
- **Drag and Drop Interaction:** Move and reposition models easily.

---

## Technologies Used

- [ReactJS](https://reactjs.org/)
- [Three.js](https://threejs.org/)
- [Tinkercad](https://www.tinkercad.com/)
- [WebXR](https://immersive-web.github.io/webxr/)

---

## Usage

1. Visit the live site: [outdoor-kitchen-planner.vercel.app](https://outdoor-kitchen-planner.vercel.app/)
2. Select a counter model (straight or L-shape).
3. Add models (cabinet, fridge) to the counter.
4. Drag to move models into position.
5. Use the AR mode (on supported devices) to view the design in your environment.

---

## Current Limitations

- **Limited AR Session:** The AR session is basic, with limited control and interaction.
- **No Snap Points:** Models can be freely moved but do not snap into place.
- **Model Scaling Issues:** Models may spawn at a large or inconsistent scale when entering AR mode.
- **Simple Models:** Only two basic models (cabinet and fridge) are available, without detailed textures or customization options.

---

## Future Improvements

- Expand the library of kitchen components (e.g., stove, sink, grill heads).
- Create more detailed and textured 3D models.
- Allow user-customized dimensions and model uploads.
- Improve mobile and AR interaction.

---

## License

This project is licensed under the [MIT License](LICENSE).
