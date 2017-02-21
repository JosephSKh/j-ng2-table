import { Component, OnInit, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'j-ng2-table',
    templateUrl: 'j-ng2-table.component.html',
    styleUrls: ['j-ng2-table.component.css']
})
export class JNG2TableComponent implements OnInit {
    constructor() { }

    @Input() data;
    cols : any[] = [];

    ngOnInit() {
        this.prepareColumns(this.data);
    }

    prepareColumns(data: any[]){
        this.cols = Object.keys(data[0]);
        for(var i = 0 ; i < this.cols.length ; i++){
            this.cols[i] = {
                  name : this.cols[i],
                  sort : null,
                  pinned: i==1 || i==0?true:false,
            }
        }
    }

    sortClicked(col : any){
        var index = this.cols.indexOf(col);
        if(this.cols[index].sort == null){
            this.cols[index].sort = true;
        }else{
            this.cols[index].sort = !this.cols[index].sort;
        }
        for(var i = 0 ; i < this.cols.length ; i++){
            if(i!=index){
                this.cols[i].sort = null;
            }
        }
        var sortBit = this.cols[index].sort?1:-1;
        this.data = this.data.sort((a, b) => {
            if (a[this.cols[index].name] < b[this.cols[index].name]) return sortBit*-1;
            else if (a[this.cols[index].name] > b[this.cols[index].name]) return sortBit;
            else return 0;
        });
    }
}