import { useState, useEffect } from 'react';

export interface MotionData {
    x: number; // -1 to 1
    y: number; // -1 to 1
}

export const useDeviceMotion = () => {
    const [motion, setMotion] = useState<MotionData>({ x: 0, y: 0 });

    useEffect(() => {
        // Mouse fallback for desktop
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            setMotion({ x, y });
        };

        // Device orientation for mobile
        const handleOrientation = (e: DeviceOrientationEvent) => {
            if (e.beta !== null && e.gamma !== null) {
                // beta: -180 to 180 (front-back tilt)
                // gamma: -90 to 90 (left-right tilt)
                const x = Math.max(-1, Math.min(1, e.gamma / 45));
                const y = Math.max(-1, Math.min(1, e.beta / 45));
                setMotion({ x, y });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('deviceorientation', handleOrientation);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('deviceorientation', handleOrientation);
        };
    }, []);

    return motion;
};
