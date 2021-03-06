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
    @Input() options;
    cachedData: any;
    cols: any[] = [];
    curPage: number;
    pages: number[] = [];
    filters: any = {};

    ngOnInit() {
        this.cachedData = this.data;
        if (!this.options) {
            this.options = {
                numberOfPages: 0,
                itemsPerPage: this.cachedData.length
            }
        }
        this.preparePages();
        this.setPage(1);
        this.prepareColumns(this.data);
    }

    preparePages() {
        this.pages = [];
        if (this.options['itemsPerPage'] != this.cachedData.length) {
            this.options['numberOfPages'] = this.data.length / this.options['itemsPerPage'];
            if (this.options['numberOfPages'] % 1 != 0) {
                this.options['numberOfPages'] = (this.options['numberOfPages'] - (this.options['numberOfPages'] % 1)) + 1;
            }
        }
        for (var i = 1; i <= this.options['numberOfPages']; i++) {
            this.pages.push(i);
        }
    }

    setPage(page: number) {
        this.preparePages();
        this.curPage = page;
    }

    prepareColumns(data: any[]) {
        this.cols = Object.keys(data[0]);
        for (var i = 0; i < this.cols.length; i++) {
            this.cols[i] = {
                name: this.cols[i],
                sort: null,
                pinned: false,
                visible: true,
                order: i,
            }
        }
    }

    sortClicked(col: any) {
        var index = this.cols.indexOf(col);
        if (this.cols[index].sort == null) {
            this.cols[index].sort = true;
        } else {
            this.cols[index].sort = !this.cols[index].sort;
        }
        for (var i = 0; i < this.cols.length; i++) {
            if (i != index) {
                this.cols[i].sort = null;
            }
        }
        var sortBit = this.cols[index].sort ? 1 : -1;
        this.data = this.data.sort((a, b) => {
            if (a[this.cols[index].name] < b[this.cols[index].name]) return sortBit * -1;
            else if (a[this.cols[index].name] > b[this.cols[index].name]) return sortBit;
            else return 0;
        });
    }

    moveLeft(index: number) {
        var temp = this.cols[index];
        this.cols[index] = this.cols[index - 1];
        this.cols[index - 1] = temp;
    }
    moveRight(index: number) {
        var temp = this.cols[index];
        this.cols[index] = this.cols[index + 1];
        this.cols[index + 1] = temp;
    }

    csvDownload() {
        var csv = [];
        for (var r = -1; r < this.cachedData.length; r++) {
            var row = "";
            if (r == -1) {
                for (var c = 0; c < this.cols.length; c++) {
                    row += this.cols[c].name + ",";
                }
            } else {
                for (var i = 0; i < this.cols.length; i++) {
                    row += this.cachedData[r][this.cols[i].name] + ",";
                }
            }
            row += "\r\n";
            csv.push(row);
        }
        var a = window.document.createElement('a');
        a.href = window.URL.createObjectURL(new Blob(csv, { type: 'text/csv' }));
        a.download = 'j-ng2-dropdown-data.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    txtDownload() {
        var csv = [];
        for (var r = -1; r < this.cachedData.length; r++) {
            var row = "";
            if (r == -1) {
                for (var c = 0; c < this.cols.length; c++) {
                    row += this.cols[c].name + ",";
                }
            } else {
                for (var i = 0; i < this.cols.length; i++) {
                    row += this.cachedData[r][this.cols[i].name] + ",";
                }
            }
            row += "\r\n";
            csv.push(row);
        }
        var a = window.document.createElement('a');
        a.href = window.URL.createObjectURL(new Blob(csv, { type: 'text/plain' }));
        a.download = 'j-ng2-dropdown-data.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    csvDownloadFiltered() {
        var csv = [];
        for (var r = -1; r < this.data.length; r++) {
            var row = "";
            if (r == -1) {
                for (var c = 0; c < this.cols.length; c++) {
                    row += this.cols[c].name + ",";
                }
            } else {
                for (var i = 0; i < this.cols.length; i++) {
                    row += this.data[r][this.cols[i].name] + ",";
                }
            }
            row += "\r\n";
            csv.push(row);
        }
        var a = window.document.createElement('a');
        a.href = window.URL.createObjectURL(new Blob(csv, { type: 'text/csv' }));
        a.download = 'j-ng2-dropdown-data.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    txtDownloadFiltered() {
        var csv = [];
        for (var r = -1; r < this.data.length; r++) {
            var row = "";
            if (r == -1) {
                for (var c = 0; c < this.cols.length; c++) {
                    row += this.cols[c].name + ",";
                }
            } else {
                for (var i = 0; i < this.cols.length; i++) {
                    row += this.data[r][this.cols[i].name] + ",";
                }
            }
            row += "\r\n";
            csv.push(row);
        }
        var a = window.document.createElement('a');
        a.href = window.URL.createObjectURL(new Blob(csv, { type: 'text/plain' }));
        a.download = 'j-ng2-dropdown-data.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }


    filter(colName: string) {
        this.data = this.cachedData;
        for (var i = 0; i < Object.keys(this.filters).length; i++) {
            var key = Object.keys(this.filters)[i];
            if (this.filters[key] != "") {
                this.data = this.data.filter(row => {
                    if (row[key].toString().toLowerCase().indexOf(this.filters[key].toString().toLowerCase()) > -1)
                        return row;
                });
            }
        }
        this.setPage(1);
    }
}
