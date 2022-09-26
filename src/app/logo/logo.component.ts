import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Core } from './core';
import { Node } from './node';

@Component({
    selector: 'app-logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {
    @Input() isSearching: boolean

    @ViewChild('canvas')
    canvas: ElementRef<HTMLCanvasElement>;
    public context: CanvasRenderingContext2D;
    width: number
    height: number
    delta: number
    time: number = Date.now()
    angle: number = 0
    core: Core
    nodes: Node[] = []
    originX: number = 0
    originY: number = 0
    darkMode: boolean = true
    searching: boolean = false
    maxNodes: number = 500

    constructor() { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.context = this.canvas.nativeElement.getContext('2d');
        this.core = new Core(this.width / 2, this.height / 2, this.width / 8)
        this.resize()
        window.requestAnimationFrame(this.draw.bind(this));
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.resize()
    }

    // Draw the canvas.
    draw(): void {
        // Theme switch
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        if (this.darkMode != isDark) {
            this.themeChange(isDark)
        }

        // Search switch
        if (this.searching != this.isSearching) {
            this.searchChange(this.isSearching)
        }

        this.delta = this.time / Date.now()
        this.angle = this.angle + (0.05 * this.delta)

        this.context.clearRect(0, 0, this.width, this.height)
        this.drawCircle()
        if (this.isSearching) {
            this.core.radius += Math.floor(Math.random() * (2 + 2) - 2)
            if (this.core.radius > this.width / 6) {
                this.core.radius = this.width / 6
            } else if (this.core.radius < this.width / 8) {
                this.core.radius = this.width / 8
            }
        } else {
            this.core.radius = this.width / 8
        }
        this.drawCore()

        // Remove old nodes.
        for (const index of this.nodes.keys()) {
            if (this.nodes[index].getDistance(this.originX, this.originY) < this.core.radius) {
                this.nodes.splice(index, 1)
            }
        }

        // Add new nodes.
        if (this.nodes.length < this.maxNodes) {
            var angle = Math.floor(Math.random() * 359)
            this.createNode(angle)
        }

        // Update and draw nodes.
        for (let node of this.nodes) {
            node.update(this.originX, this.originY, this.delta)
            node.draw(this.context)
        }
        
        
        this.time = Date.now()
        window.requestAnimationFrame(this.draw.bind(this));
    }

    // Handle screen resize event.
    resize(): void {
        this.width = this.canvas.nativeElement.offsetWidth
        this.height = this.width
        this.originX = this.width / 2
        this.originY = this.height / 2
        this.canvas.nativeElement.setAttribute("width", this.width.toString() + "px")
        this.canvas.nativeElement.setAttribute("height", this.height.toString() + "px")
        this.core.update(this.width / 2, this.height / 2, this.width / 8)
    }

    // Outer circle
    drawCircle(): void {
        this.context.save()
        this.context.translate(this.width / 2, this.height / 2)
        this.context.rotate(this.angle * (Math.PI / 180))
        this.context.strokeStyle = this.darkMode ? "#ffffff" : "#000000"
        this.context.lineWidth = 3
        this.context.setLineDash([20, 20])
        this.context.beginPath();
        this.context.arc(this.context.lineWidth / 2, this.context.lineWidth / 2, (this.width / 2) - (this.context.lineWidth * 2), 0, Math.PI * 2, true); // Outer circle
        this.context.stroke()
        this.context.restore()
    }

    // Inner circle
    drawCore(): void {
        this.core.draw(this.context)
    }

    // Add new node
    createNode(angle: number): void {
        let radian = angle * (Math.PI / 180)
        const radius = this.width / 2
        let x = this.originX + (radius * Math.sin(radian))
        let y = this.originY + (radius * Math.cos(radian))
        let nodeSize = Math.random() * (4 - 2) + 2
        this.nodes.push(new Node(x, y, nodeSize, this.darkMode, this.isSearching ? Node.SPEED_SLOW : Node.SPEED_NORMAL))
    }

    // Handle search change, speed of nodes
    searchChange(isSearching): void {
        this.searching = isSearching
        for (let node of this.nodes) {
            node.acceleration = this.searching ? Node.SPEED_SLOW : Node.SPEED_NORMAL
        }
    }

    // Handle theme change
    themeChange(isDark: boolean): void {
        this.darkMode = isDark
        this.core.darkMode = isDark
        for (let node of this.nodes) {
            node.darkMode = isDark
        }
    }

}
