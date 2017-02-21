# j-ng2-table
j-ng2-table is an open source table library designed for angular 2 that supports a lot of features such as pinning, toggleing, sorting, filtering, paging ... etc

##NPM Install:
`npm install j-ng2-table`

##Importing:
*important: please import font awesome*

**app.module.ts**

    import { AppComponent } from './app.component';
    import { JNG2TableComponent } from './j-ng2-table/j-ng2-table.component';
    @NgModule({
      declarations: [
        AppComponent,
        JNG2TableComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpModule
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule { }
    
**your-component.component.html**
    
    <j-ng2-table [data]="data" [options]="options"></j-ng2-table>
        
**your-component.component.ts**
    
    import { Component, OnInit } from '@angular/core';
    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.css']
    })
    export class AppComponent implements OnInit {
      options = {
        itemsPerPage : 10
      };
      data = [    
        {"name":"Ram", "email":"ram@gmail.com", "age":23},    
        {"name":"Shyam", "email":"shyam23@gmail.com", "age":28},  
        {"name":"John", "email":"john@gmail.com", "age":33},    
        {"name":"Bob", "email":"bob32@gmail.com", "age":41}
      ];
    }

###Options:
**itemsPerPage**: Number of rows per page
