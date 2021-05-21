(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "+ij1":
/*!***********************************!*\
  !*** ./src/app/sudoku.service.ts ***!
  \***********************************/
/*! exports provided: SudokuService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SudokuService", function() { return SudokuService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _cell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cell */ "rv8r");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");



class SudokuService {
    constructor() { }
    getCells() {
        let rowGrid = [];
        let cellSectionGrid = [[], [], [], [], [], [], [], [], []];
        //Sad generate a full 9*9 grid to prevent index out of bound errors
        for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
            let row = [];
            for (let columnIndex = 0; columnIndex < 9; columnIndex++) {
                row.push(-1);
            }
            rowGrid.push(row);
        }
        rowGrid = fillGrid(0, 0, rowGrid);
        //Convert row grid => section grid
        for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
            for (let columnIndex = 0; columnIndex < 9; columnIndex++) {
                let sectionIndex = (((Math.floor(rowIndex / 3)) * 3) + Math.floor(columnIndex / 3));
                cellSectionGrid[sectionIndex].push(new _cell__WEBPACK_IMPORTED_MODULE_1__["Cell"](rowGrid[rowIndex][columnIndex]));
            }
        }
        //Mask cells to create challenge
        //Doing this as a separate loop to enable sixth section to have all the information available to flip and reverse
        for (let sectionIndex = 0; sectionIndex < 9; sectionIndex++) {
            for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
                cellSectionGrid[sectionIndex][cellIndex].isInitial = CheckIsInitial(sectionIndex, cellIndex, cellSectionGrid);
            }
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(cellSectionGrid);
    }
}
SudokuService.ɵfac = function SudokuService_Factory(t) { return new (t || SudokuService)(); };
SudokuService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: SudokuService, factory: SudokuService.ɵfac, providedIn: 'root' });
function fillGrid(row, col, grid) {
    //Check if col is at the end of grid
    if (col > 8) {
        row += 1;
        col = 0;
    }
    //Check if at start of col
    if (col < 0 && row > 0) {
        row -= 1;
        col = 8;
    }
    //Check if the grid is finished
    if (row > 8) {
        return grid;
    }
    let unusedNumbers = findUsedNumbers(row, col, grid);
    while (unusedNumbers.length > 0) {
        let selectedNumber = unusedNumbers[Math.floor(Math.random() * unusedNumbers.length)];
        grid[row][col] = selectedNumber;
        try {
            fillGrid(row, col + 1, grid);
            return grid;
        }
        catch (error) {
            if (error.message === "number not found") {
                console.error(error);
                grid[row][col] = -1;
                unusedNumbers = unusedNumbers.filter(function (value) {
                    return value != selectedNumber;
                });
            }
        }
    }
    throw new Error("number not found");
}
function findUsedNumbers(rowIndex, columnIndex, rowGrid) {
    let validNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    //check section
    validNumbers = removeUsedNumberSection(validNumbers, (rowIndex - (rowIndex % 3)), (columnIndex - (columnIndex % 3)), rowGrid);
    //check row
    validNumbers = removeUsedNumberRow(rowIndex, validNumbers, rowGrid);
    //check column
    validNumbers = removeUsedNumberColumn(columnIndex, validNumbers, rowGrid);
    return validNumbers;
}
function removeUsedNumberSection(validNumbers, rowStart, colStart, usedNumbers) {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            validNumbers = validNumbers.filter(validNum => validNum != usedNumbers[rowStart + row][colStart + col]);
        }
    }
    return validNumbers;
}
function removeUsedNumberRow(row, validNumbers, currentGrid) {
    for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
        validNumbers = validNumbers.filter(validNum => validNum != currentGrid[row][cellIndex]);
    }
    return validNumbers;
}
function removeUsedNumberColumn(column, validNumbers, currentGrid) {
    for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
        validNumbers = validNumbers.filter(validNum => validNum != currentGrid[cellIndex][column]);
    }
    return validNumbers;
}
function CheckIsInitial(sectionIndex, cellIndex, CellGrid) {
    let isInitial = true;
    //for the first 5 sections, math.random
    if (sectionIndex < 5) {
        isInitial = Math.random() > 0.5;
    }
    //for the last 4 sections, missyeliot first four sections
    else {
        isInitial = CellGrid[8 - sectionIndex][8 - cellIndex].isInitial;
    }
    return isInitial;
}


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\danie\repos\sudokuweb\sudokuweb\src\main.ts */"zUnb");


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "JhD/":
/*!**********************************************!*\
  !*** ./src/app/landing/landing.component.ts ***!
  \**********************************************/
/*! exports provided: LandingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LandingComponent", function() { return LandingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class LandingComponent {
    constructor() { }
    ngOnInit() {
    }
}
LandingComponent.ɵfac = function LandingComponent_Factory(t) { return new (t || LandingComponent)(); };
LandingComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LandingComponent, selectors: [["app-landing"]], decls: 2, vars: 0, template: function LandingComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "landing works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsYW5kaW5nLmNvbXBvbmVudC5sZXNzIn0= */"] });


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");


class AppComponent {
    constructor() {
        this.title = 'SudokuWeb';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 8, vars: 1, consts: [["routerLink", "/landing"], ["routerLink", "/sudoku"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "nav");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "a", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Home");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Sudoku");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "router-outlet");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.title);
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLinkWithHref"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: ["h1[_ngcontent-%COMP%] {\n  margin: 50px;\n}\nnav[_ngcontent-%COMP%] {\n  padding: 0;\n  margin: auto;\n  max-width: 1000px;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  justify-content: space-around;\n  align-content: flex-start;\n  align-items: flex-start;\n}\na[_ngcontent-%COMP%] {\n  color: #fff;\n  background-color: #428bca;\n  border-radius: 5px;\n  padding: 1rem;\n  font-size: 1.2rem;\n  text-decoration: none;\n  display: inline-block;\n  text-align: center;\n  width: 100%;\n  min-width: 70 px;\n  margin: 0.5rem auto;\n  box-sizing: border-box;\n  order: 0;\n  flex: 0 1 auto;\n  align-self: auto;\n}\n@media (min-width: 600px) {\n  a[_ngcontent-%COMP%] {\n    width: 18%;\n    box-sizing: content-box;\n  }\n}\na[_ngcontent-%COMP%]:hover {\n  background-color: #184368;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQubGVzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQTtFQUNJLFlBQUE7QUFISjtBQU1BO0VBQ0ksVUFBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQUVBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSw2QkFBQTtFQUNBLHlCQUFBO0VBQ0EsdUJBQUE7QUFMSjtBQVFBO0VBQ0ksV0FBQTtFQUNBLHlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0EsaUJBQUE7RUFDQSxxQkFBQTtFQUNBLHFCQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBRUEsUUFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtBQVBKO0FBVUE7RUFDSTtJQUNFLFVBQUE7SUFDQSx1QkFBQTtFQVJKO0FBQ0Y7QUFXQTtFQUNJLHlCQUFBO0FBVEoiLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5sZXNzIiwic291cmNlc0NvbnRlbnQiOlsiQGxpbmstY29sb3I6ICNmZmY7XG5AbGluay1iYWNrZ3JvdW5kY29sb3I6ICM0MjhiY2E7XG5AbGluay1iYWNrZ3JvdW5kY29sb3ItaG92ZXI6ICMxODQzNjg7XG5cbmgxIHtcbiAgICBtYXJnaW46IDUwcHg7XG59XG5cbm5hdiB7XG4gICAgcGFkZGluZzogMDtcbiAgICBtYXJnaW46IGF1dG87XG4gICAgbWF4LXdpZHRoOiAxMDAwcHg7XG5cbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgZmxleC13cmFwOiB3cmFwO1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICAgIGFsaWduLWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG59XG5cbmEge1xuICAgIGNvbG9yOiBAbGluay1jb2xvcjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBAbGluay1iYWNrZ3JvdW5kY29sb3I7XG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgIHBhZGRpbmc6IDFyZW07XG4gICAgZm9udC1zaXplOiAxLjJyZW07XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWluLXdpZHRoOiA3MCBweDtcbiAgICBtYXJnaW46IC41cmVtIGF1dG87XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBcbiAgICBvcmRlcjogMDtcbiAgICBmbGV4OiAwIDEgYXV0bztcbiAgICBhbGlnbi1zZWxmOiBhdXRvO1xufVxuXG5AbWVkaWEgKG1pbi13aWR0aDogNjAwcHgpIHtcbiAgICBhIHtcbiAgICAgIHdpZHRoOiAxOCU7XG4gICAgICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcbiAgICB9XG4gIH1cblxuYTpob3ZlcntcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBAbGluay1iYWNrZ3JvdW5kY29sb3ItaG92ZXI7XG59Il19 */"] });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _landing_landing_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./landing/landing.component */ "JhD/");
/* harmony import */ var _sudoku_sudoku_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sudoku/sudoku.component */ "y18u");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");







class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_0__["ReactiveFormsModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
        _landing_landing_component__WEBPACK_IMPORTED_MODULE_4__["LandingComponent"],
        _sudoku_sudoku_component__WEBPACK_IMPORTED_MODULE_5__["SudokuComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_0__["ReactiveFormsModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"]] }); })();


/***/ }),

/***/ "rv8r":
/*!*************************!*\
  !*** ./src/app/cell.ts ***!
  \*************************/
/*! exports provided: Cell */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cell", function() { return Cell; });
class Cell {
    constructor(correctNumber) {
        this.correctNumber = correctNumber;
        this.isInitial = true;
    }
    get displayNumber() {
        if (this.isInitial) {
            return this.correctNumber;
        }
        else {
            return this._displayNumber;
        }
    }
    set displayNumber(value) {
        this._displayNumber = value;
    }
}


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _landing_landing_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./landing/landing.component */ "JhD/");
/* harmony import */ var _sudoku_sudoku_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sudoku/sudoku.component */ "y18u");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");





const routes = [
    { path: '', redirectTo: '/landing', pathMatch: 'full' },
    { path: 'landing', component: _landing_landing_component__WEBPACK_IMPORTED_MODULE_1__["LandingComponent"] },
    { path: 'sudoku', component: _sudoku_sudoku_component__WEBPACK_IMPORTED_MODULE_2__["SudokuComponent"] }
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "y18u":
/*!********************************************!*\
  !*** ./src/app/sudoku/sudoku.component.ts ***!
  \********************************************/
/*! exports provided: SudokuComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SudokuComponent", function() { return SudokuComponent; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _sudoku_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../sudoku.service */ "+ij1");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");





function SudokuComponent_div_4_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "input", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const j_r5 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroupName", j_r5);
} }
function SudokuComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](1, 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, SudokuComponent_div_4_div_2_Template, 2, 1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const section_r1 = ctx.$implicit;
    const i_r2 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroupName", i_r2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", section_r1.get("section").value);
} }
class SudokuComponent {
    constructor(sudokuService, formBuilder) {
        this.sudokuService = sudokuService;
        this.formBuilder = formBuilder;
        this.sudokuForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormGroup"]({});
    }
    get sections() {
        return this.sudokuForm.get('sections');
    }
    ngOnInit() {
        this.getCells();
    }
    getCells() {
        this.sudokuService.getCells()
            .subscribe(grid => this.makeForm(grid));
    }
    makeForm(grid) {
        this.sudokuForm = this.formBuilder.group({
            sections: this.makeGrid(grid)
        });
    }
    makeGrid(grid) {
        const sectionArray = grid.map(section => { return this.makeSectionGroup(section); });
        return this.formBuilder.array(sectionArray);
    }
    makeSectionGroup(section) {
        return this.formBuilder.group({
            section: this.makeSection(section)
        });
    }
    makeSection(section) {
        const cellArray = section.map(sudokuCell => {
            return this.formBuilder.group({
                cell: [{ value: sudokuCell.displayNumber, disabled: sudokuCell.isInitial }],
                isInitial: []
            });
        });
        return this.formBuilder.array(cellArray);
    }
}
SudokuComponent.ɵfac = function SudokuComponent_Factory(t) { return new (t || SudokuComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_sudoku_service__WEBPACK_IMPORTED_MODULE_2__["SudokuService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormBuilder"])); };
SudokuComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: SudokuComponent, selectors: [["app-sudoku"]], decls: 5, vars: 2, consts: [[1, "grid", 3, "formGroup"], ["formArrayName", "sections"], ["class", "section", 3, "formGroupName", 4, "ngFor", "ngForOf"], [1, "section", 3, "formGroupName"], ["formArrayName", "section"], ["class", "cell", 3, "formGroupName", 4, "ngFor", "ngForOf"], [1, "cell", 3, "formGroupName"], ["formControlName", "cell", 1, "inputCell"]], template: function SudokuComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "sudoku works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](3, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, SudokuComponent_div_4_Template, 3, 2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.sudokuForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.sections.controls);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_0__["ɵangular_packages_forms_forms_ba"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormGroupDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormArrayName"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormGroupName"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControlName"]], styles: [".grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto auto auto;\n  grid-gap: 5px;\n  max-width: 450px;\n  margin: auto;\n  background-color: #dadada;\n}\n.section[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto auto auto;\n  background-color: white;\n  align-items: center;\n}\n.cell[_ngcontent-%COMP%] {\n  text-align: center;\n  margin: 5px;\n}\n.inputCell[_ngcontent-%COMP%] {\n  text-align: center;\n  width: 25px;\n  height: 25px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1ZG9rdS5jb21wb25lbnQubGVzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQTtFQUNJLGFBQUE7RUFDQSxxQ0FBQTtFQUNBLGFBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7RUFDQSx5QkFBQTtBQUZKO0FBTUE7RUFDSSxhQUFBO0VBQ0EscUNBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0FBSko7QUFPQTtFQUNJLGtCQUFBO0VBQ0EsV0FBQTtBQUxKO0FBUUE7RUFDSSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBTkoiLCJmaWxlIjoic3Vkb2t1LmNvbXBvbmVudC5sZXNzIiwic291cmNlc0NvbnRlbnQiOlsiQHdpZHRoOiAyNXB4O1xuQGhlaWdodDogQHdpZHRoO1xuXG4uZ3JpZCB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IGF1dG8gYXV0byBhdXRvO1xuICAgIGdyaWQtZ2FwOiA1cHg7XG4gICAgbWF4LXdpZHRoOiA0NTBweDtcbiAgICBtYXJnaW46IGF1dG87XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2RhZGFkYTtcbiAgICBcbn1cblxuLnNlY3Rpb24ge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBhdXRvIGF1dG8gYXV0bztcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uY2VsbHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgbWFyZ2luOiA1cHg7XG59XG5cbi5pbnB1dENlbGwge1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB3aWR0aDogQHdpZHRoO1xuICAgIGhlaWdodDogQGhlaWdodDtcbn0iXX0= */"] });


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map