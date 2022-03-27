export class Engine{
    _grid: number[];
    _size: number;

    constructor(size: number){
        this._size = size;
        this._grid = new Array(size * size);
    }

    public get(length:number, width:number): number{
        return this._grid[length * this._size + width];
    }

    public initialize(): void{
        this.reset();

        this.reveal_new_tile();
        this.reveal_new_tile();
        this.reveal_new_tile();
    }

    private reset(): void{
        this._grid.fill(0);
    }

    private reveal_new_tile(): void{
        let tile_index;
        let probability = Math.random();
        let zeroes : number[] = [];

        /* Get indexes of empty tiles */
        this._grid.forEach((element, index) => {
            element == 0 ? zeroes.push(index) : null;
        });

        /* Get an index of empty an tile randomly chosen */
        tile_index = zeroes.reduce((acc, element, _, array) => {
            if(acc === 0){ acc = Math.random() > 0.7 ? element : 0; }
            if(acc === 0 && array.indexOf(element) === -1){ acc = element; }

            return acc;
        });

        if(probability < 0.7){ this._grid[tile_index] = 2; }
        else{ this._grid[tile_index] = 4; }
    }

    public slide(side: string): void{
        let gridHasChanged = false;
        switch(side){
            case "left":
                gridHasChanged = this.slideOnChosenSide(0, false, true);
                if(gridHasChanged) {this.reveal_new_tile();}
                break;

            case "right":
                gridHasChanged = this.slideOnChosenSide(this._size - 1, false, false);
                if(gridHasChanged) {this.reveal_new_tile();}
                break;
                
            case "up":
                gridHasChanged = this.slideOnChosenSide(0, true, true);
                if(gridHasChanged) {this.reveal_new_tile();}
                break;

            case "down":
                gridHasChanged = this.slideOnChosenSide(this._size - 1, true, false);
                if(gridHasChanged) {this.reveal_new_tile();}
                break;

            default:
                break;
        }

        if(this.isWon()){
            window.alert("you win");
        }
    }

    public isWon():boolean{
        return this._grid.includes(2048);
    }

    private slideOnChosenSide(start: number, isColumn:boolean, LtR:boolean): boolean{
        let index = (i:number, j:number) => {
            if(isColumn) {return j * this._size + i; }
            return i * this._size + j;
        };

        let gridHasChanged = false;

        for(let i = 0; i < this._size; i++){
            let prev_index = start;

            for(let j = 0; j < this._size; j++){
                let k = LtR ? j : start - j;

                if( ((LtR && k > prev_index) || (!LtR && k < prev_index))
                    && this._grid[index(i, k)] == this._grid[index(i,prev_index)])
                {
                    this._grid[index(i, prev_index)] = this._grid[index(i, k)] * 2;
                    this._grid[index(i, k)] = 0;
                    gridHasChanged = true;

                    prev_index = LtR ? k + 1 : k - 1;
                }

                if( ((LtR && k > prev_index) || (!LtR && k < prev_index))
                    && this._grid[index(i, k)] != 0)
                {
                    prev_index = k;
                }
            }
        }

        for(let i = 0; i < this._size; i++){
            let prev_index = start;

            for(let k = 0; k < this._size; k++){
                let j = LtR ? k : start - k;

                if(this._grid[index(i, prev_index)] != 0){
                    prev_index = j;
                }

                if(prev_index != j && this._grid[index(i, j)] != 0){
                    this._grid[index(i, prev_index)] = this._grid[index(i, j)];
                    this._grid[index(i, j)] = 0;
                    gridHasChanged = true;
                    
                    prev_index = LtR ? prev_index + 1 : prev_index - 1;
                }
            }
        }

        return gridHasChanged;
    }
}