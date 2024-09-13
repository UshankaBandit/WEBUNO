interface StackNode<T> {
    value: T | null
    next: StackNode<T> | null
}

class StackNode<T> implements StackNode<T> {
    constructor(val: T) {
        this.value = val
        this.next = null
    }
}

export interface Stack<T> {
    size: number
    top: StackNode<T> | null
    bottom: StackNode<T> | null
    push(val: T): number
    pop(): T | null
    peek(): T | null
}

export class Stack<T = string> implements Stack<T> {
    constructor() {
        this.size = 0
        this.top = null
        this.bottom = null
    }
    
    push(val: T) {
        const node = new StackNode(val)
        if (this.size === 0) {
            this.top = node
            this.bottom = node
        } else {
            const currentTop = this.top
            this.top = node
            this.top.next = currentTop
        }

        this.size += 1
        return this.size
    }
    
    pop(): T | null {
        if (this.size > 0) {
            const nodeToBeRemove = this.top as StackNode<T>
            this.top = nodeToBeRemove.next = null
            return nodeToBeRemove.value
        }
        return null
    }

    peek(): T | null {
        if (this.size > 0) {
            const nodeToBePeek = this.top as StackNode<T>
            return nodeToBePeek.value
        }
        return null
    }
}
