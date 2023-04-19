interface ICar {
    color: string;
    model: string;
    topSpeed?: number;
}

const Car1:ICar = {
    color: "Red",
    model:"New",
    topSpeed: 250
}

const Car2: ICar = {
    color: "Blue",
    model: "New"
}

const multiply = (x: number, y: number): string => {
    return (x * y).toString();
}