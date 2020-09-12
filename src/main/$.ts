class JQuery {
    private elements: Array<HTMLElement>;
    private CLASS_NAME_REGEX: RegExp = RegExp("^[a-zA-Z_-][a-zA-Z\d_-]*$");

    static fromAttribute(attribute: string, attributeValue: string): JQuery {
        let elementArray: Array<HTMLElement> = new Array();
        this.populateArrayByAttribute(attribute, attributeValue, document.body.children, 0, elementArray);

        return new JQuery(elementArray);
    } 

    static fromElement(htmlElem: HTMLElement): JQuery {
        let elementArray: Array<HTMLElement> = new Array(htmlElem);
        return new JQuery(elementArray);
    }

    private static populateArrayByAttribute(attribute: string, attributeValue: string, htmlElems: any,
        currIndex: number, elemArray: Array<HTMLElement>): void {
            if(htmlElems === null || htmlElems.item(currIndex) === null) return;

            if(htmlElems.item(currIndex).getAttribute(attribute) === attributeValue) {
                elemArray.push(htmlElems.item(currIndex));
            }

            this.populateArrayByAttribute(attribute, attributeValue, htmlElems.item(currIndex).children, 0, elemArray);
            if(currIndex !== htmlElems.length - 1) {
                this.populateArrayByAttribute(attribute, attributeValue, htmlElems, currIndex + 1, elemArray);
            } 
    }

    constructor(htmlElements: Array<HTMLElement>) {
        this.elements = htmlElements;
    }

    getElements(): Array<HTMLElement> {
        return this.elements;
    }

    getElement(index: number = 0): HTMLElement {
        return this.elements[index];
    }

    getCssProperty(propertyName: any, index: number = 0): string {
        const elemStyle: CSSStyleDeclaration = this.elements[index].style; 
        return elemStyle.getPropertyValue(propertyName);
    }

    setCssProperty(propertyName: any, value: string, index: number = 0): void {
        let currInlineStyle: CSSStyleDeclaration = this.elements[index].style;
        currInlineStyle.setProperty(propertyName, value);
    }

    setCssProperties(propertiesAsObject: {[key: string]: string}, index: number = 0): void {
        for(const key in propertiesAsObject) {
            this.setCssProperty(key, propertiesAsObject[key], index);
        }
    }

    setText(newText: string, index: number = 0): void {
        this.elements[index].textContent = newText;
    }

    getText(index: number = 0): string {
        const textContent = this.elements[index].textContent;
        if(textContent !== null) return textContent;
        return "";
    }

    getAttr(attribute: string, index: number = 0): string {
        let attributeValue: string | null = this.elements[index].getAttribute(attribute);
        if(attributeValue === null) return "";
        return attributeValue;
    }

    setAttr(attribute: string, value: string, index: number = 0): void {
        this.elements[index].setAttribute(attribute, value);
    }

    removeAttr(attribute: string, index: number = 0): void {
        this.elements[index].removeAttribute(attribute);
    }

    getHtml(index: number = 0): string {
        return this.elements[index].innerHTML;
    }
   
    click(callback: Function): void {
        for(const element of this.elements) {
            element.addEventListener("click", (event: MouseEvent) => {
                callback(event);
            });
        }
    }

    blur(callback: Function): void {
        for(const element of this.elements) {
            element.addEventListener("blur", () => {
                callback();
            });
        }
    }

    focus(callback: Function): void {
        for(const element of this.elements) {
            element.addEventListener("focus", () => {
                callback();
            });
        }
    }

    addChild(newChildElement: HTMLElement, index: number = 0): void {
        this.elements[index].appendChild(newChildElement);
    }

    children(index: number = 0): HTMLCollection {
        return this.elements[index].children;
    }

    addClass(newClass: string, index: number = 0): void {
        if(!this.CLASS_NAME_REGEX.test(newClass)) {
            throw new Error(`Invalid characters in class name: '${newClass}'`);
        }

        newClass = this.elements[index].className.length > 0 ? ` ${newClass}` : newClass;
        let newClassName = this.elements[index].className + newClass;
        this.elements[index].className = newClassName;
    }

    getClass(index: number = 0): string {
        return this.elements[index].className;
    }

    removeClass(classToRemove: string, index: number = 0): void {
        let startIndex = this.elements[index].className.indexOf(classToRemove);
        let endIndex = startIndex + classToRemove.length;
        let oldClassName = this.elements[index].className;
        
        if(startIndex < 0) return;

        if(endIndex !== oldClassName.length) {
            endIndex++;
        } else {
            startIndex--;
        }
        
        let newClassNames = oldClassName.slice(0, startIndex) + oldClassName.slice(endIndex, oldClassName.length);
        this.elements[index].className = newClassNames;
    }

}

module.exports = JQuery;