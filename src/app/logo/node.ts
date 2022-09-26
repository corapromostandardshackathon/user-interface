export class Node {
    static SPEED_SLOW = 1
    static SPEED_NORMAL = 3

    initialX: number
    initialY: number
    public x: number
    public y: number
    public radius: number
    public acceleration: number = 3
    darkMode: boolean = true
    opacity: number = 0

    constructor(x: number, y: number, radius: number, darkMode: boolean, speed: number = Node.SPEED_NORMAL) {
        this.initialX = x
        this.initialY = y
        this.x = x
        this.y = y
        this.radius = radius
        this.darkMode = darkMode
        this.acceleration = speed
    }

    public draw(context: CanvasRenderingContext2D): void {
        context.save()
        if (this.darkMode) {
            context.fillStyle = "rgba(255, 255, 255, " + this.opacity + ")"
        } else {
            context.fillStyle = "rgba(0, 0, 0, " + this.opacity + ")"
        }
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        context.fill()
        context.restore()
    }

    public update(x: number, y: number, delta: number) {
        let maxDistance = Math.sqrt(Math.pow(this.initialX - x, 2) + Math.pow(this.initialY - y, 2))
        const currentDistance = Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2))
        let scale = Math.abs((currentDistance - maxDistance) / maxDistance)
        if (scale == 0) {
            scale = scale + 0.1
        }
        this.opacity = Math.abs((currentDistance - maxDistance) / maxDistance) * 2
        const radians = Math.atan2(y - this.y, x - this.x)
        this.x += Math.cos(radians) * (this.acceleration * (scale * this.acceleration)) * delta
        this.y += Math.sin(radians) * (this.acceleration * (scale * this.acceleration)) * delta
    }

    public getDistance(x: number, y: number): number {
        return Math.abs(Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2)))
    }
}