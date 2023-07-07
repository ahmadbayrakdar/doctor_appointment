export const generateTimeSlots = (startTime: number, endTime: number, interval: number) => {
    const timeSlots = [];
    let currentTime = startTime;
    while (currentTime <= endTime) {
        timeSlots.push(currentTime);
        currentTime += interval;
    }
    return timeSlots;
};