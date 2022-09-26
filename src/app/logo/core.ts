export class Core {
    public x: number
    public y: number
    public radius: number
    public darkMode: boolean = true

    constructor(x: number, y: number, radius: number, darkMode: boolean = true) {
        this.x = x
        this.y = y
        this.radius = radius
    }

    public draw(context: CanvasRenderingContext2D): void {
        context.save()
        context.fillStyle = this.darkMode ? "#ffffff" : "#000000"
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true); // Outer circle
        context.fill()
        context.restore()
    }

    public update(x: number, y: number, radius: number) {
        this.x = x, this.y = y, this.radius = radius
    }
}