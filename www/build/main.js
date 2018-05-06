webpackJsonp([0],{

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__diary_diary__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__messages_messages__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_settings__ = __webpack_require__(351);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TabsPage = (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__diary_diary__["a" /* DiaryPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_2__messages_messages__["a" /* MessagesPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_3__settings_settings__["a" /* SettingsPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"D:\Taylor\Documents\Websites\strengthsheet\mobile\src\pages\tabs\tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="Diary" tabIcon="bookmarks"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Messages" tabIcon="chatboxes"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Settings" tabIcon="cog"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"D:\Taylor\Documents\Websites\strengthsheet\mobile\src\pages\tabs\tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DiaryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ion_datepicker__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modals_add_exercise_add_exercise__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modals_edit_diary_exercise_edit_diary_exercise__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modals_notifications_notifications__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_diary_diary__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_notification_notification__ = __webpack_require__(451);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var DiaryPage = (function () {
    function DiaryPage(navCtrl, params, modalCtrl, storage, events, alertCtrl, plt, diaryProvider, notificationProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.params = params;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.plt = plt;
        this.diaryProvider = diaryProvider;
        this.notificationProvider = notificationProvider;
        this.selectedDate = this.params.data.date ? this.params.data.date : new Date();
        this.setupSlides();
        this.userRetreived = false;
        this.notificationCount = 0;
        this.notificationProvider.getNotificationCount().then(function (data) {
            _this.notificationCount = parseInt(data);
        });
        this.user = {};
        this.storage.get("user").then(function (user) {
            console.log(user);
            if (user) {
                _this.user = user;
                _this.userRetreived = true;
                if (_this.workouts.length > 1) {
                    _this.getWorkout(_this.workouts[7]);
                }
            }
        });
        this.events.subscribe("notification:received", function (notification) {
            _this.notificationCount += 1;
            if (notification.type === "diary") {
                _this.refreshWorkouts();
            }
        });
        this.events.subscribe("notification:viewed", function (notification) {
            _this.notificationProvider.getNotificationCount().then(function (data) {
                _this.notificationCount = parseInt(data);
            });
        });
    }
    DiaryPage.prototype.setupSlides = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.workoutSlides = [_this.selectedDate];
            _this.workouts = [{ loading: true, retreived: false, exercises: [] }];
            for (var i = 1; i < 8; i++) {
                var newDate = _this.calculateDate(_this.selectedDate, -i);
                _this.workoutSlides.unshift(newDate);
                _this.workouts.unshift({ loading: true, retreived: false, exercises: [] });
                var newDate2 = _this.calculateDate(_this.selectedDate, i);
                _this.workoutSlides.push(newDate2);
                _this.workouts.push({ loading: true, retreived: false, exercises: [] });
            }
            resolve();
        });
    };
    DiaryPage.prototype.workoutChanged = function () {
        this.selectedDate = this.workoutSlides[this.slides.getActiveIndex()];
        this.getWorkout(this.workouts[this.slides.getActiveIndex()]);
        if (this.slides.isBeginning()) {
            for (var i = 1; i < 8; i++) {
                var newDate = this.calculateDate(this.selectedDate, -i);
                this.workoutSlides.unshift(newDate);
                this.workouts.unshift({ loading: true, retreived: false, exercises: [] });
            }
            this.slides.slideTo(7, 0, false);
        }
        else if (this.slides.isEnd()) {
            for (var i = 1; i < 8; i++) {
                var newDate = this.calculateDate(this.selectedDate, i);
                this.workoutSlides.push(newDate);
                this.workouts.push({ loading: true, retreived: false, exercises: [] });
            }
        }
    };
    DiaryPage.prototype.refreshWorkout = function () {
        this.getWorkout(this.workouts[this.slides.getActiveIndex()]);
    };
    DiaryPage.prototype.refreshWorkouts = function () {
        for (var _i = 0, _a = this.workouts; _i < _a.length; _i++) {
            var workout = _a[_i];
            workout.retreived = false;
        }
        this.getWorkout(this.workouts[this.slides.getActiveIndex()]);
    };
    DiaryPage.prototype.getWorkout = function (workout) {
        if (workout.retreived || !this.userRetreived) {
            return;
        }
        else {
            var formattedDate = __WEBPACK_IMPORTED_MODULE_3_moment__(this.selectedDate).format('YYYY-MM-DD');
            workout.exercises = [];
            workout.retreived = true;
            this.diaryProvider.getWorkout(this.user.id, formattedDate).then(function (data) {
                var workoutData = data[0];
                workout.id = workoutData.id;
                workout.notes = workoutData.notes;
                workout.videos = workoutData.videos;
                workout.exercises = workoutData.exercises;
                workout.loading = false;
                workout.retreived = true;
                if (!workout.exercises) {
                    workout.exercises = [];
                }
                console.log(workout);
            })
                .catch(function () {
                workout.loading = false;
                workout.retreived = false;
            });
        }
    };
    DiaryPage.prototype.calculateDate = function (date, change) {
        return (function (d) { return new Date(d.setDate(d.getDate() + change)); })(new Date(date));
    };
    DiaryPage.prototype.getSelectedDate = function () {
        return __WEBPACK_IMPORTED_MODULE_3_moment__(this.selectedDate).calendar(null, {
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            nextWeek: 'dddd',
            lastDay: '[Yesterday]',
            lastWeek: '[Last] dddd',
            sameElse: 'dddd, MMMM Do YYYY'
        });
    };
    DiaryPage.prototype.getSelectedDateKey = function () {
        return __WEBPACK_IMPORTED_MODULE_3_moment__(this.selectedDate).format('YYYY-MM-DD');
    };
    DiaryPage.prototype.getSetString = function (exercise) {
        var returnString = "";
        if (exercise.sets || exercise.reps) {
            returnString += (exercise.sets ? exercise.sets : 0) + " set" + (exercise.sets === 1 ? "" : "s") + " of ";
        }
        if (exercise.reps || exercise.sets) {
            returnString += (exercise.reps ? exercise.reps : 0) + " rep" + (exercise.reps === 1 ? "" : "s");
        }
        if (exercise.weight) {
            returnString += ", " + exercise.weight + exercise.units;
        }
        if (exercise.percentage) {
            returnString += ", " + exercise.percentage + "%";
        }
        if (exercise.rpe) {
            returnString += ", @" + exercise.rpe + "RPE";
        }
        return returnString.replace(/^,/, '').trim();
    };
    DiaryPage.prototype.changeDay = function (direction) {
        this.selectedDate = this.calculateDate(this.selectedDate, direction);
        this.getWorkout(this.workouts[this.slides.getActiveIndex()]);
        if (direction > 0) {
            this.slides.slideNext();
        }
        else {
            this.slides.slidePrev();
        }
    };
    DiaryPage.prototype.changeDate = function (date) {
        var _this = this;
        this.selectedDate = date;
        this.setupSlides().then(function () {
            _this.slides.slideTo(7, 0, false);
            _this.getWorkout(_this.workouts[7]);
        });
    };
    DiaryPage.prototype.openEditExerciseModal = function (exercise, index) {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__modals_edit_diary_exercise_edit_diary_exercise__["a" /* EditDiaryExerciseModal */], { exercise: exercise });
        modal.onDidDismiss(function (updatedExercise) {
            if (updatedExercise && updatedExercise.deleted) {
                _this.workouts[_this.slides.getActiveIndex()].exercises.splice(index, 1);
                _this.diaryProvider.deleteWorkoutExercise(updatedExercise.id);
            }
            else if (updatedExercise) {
                Object.assign(exercise, updatedExercise);
                _this.diaryProvider.updateWorkoutExercise(exercise);
            }
        });
        modal.present();
    };
    DiaryPage.prototype.openAddDiaryModal = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__modals_add_exercise_add_exercise__["a" /* AddExerciseModal */]);
        modal.onDidDismiss(function (exercise) {
            if (exercise) {
                var currentWorkout_1 = _this.workouts[_this.slides.getActiveIndex()];
                var workoutExercise_1 = { id: null, client_user_id: _this.user.id, date: _this.getSelectedDateKey(), order: currentWorkout_1.exercises.length + 1, exercise_id: exercise.id, exercise: exercise };
                currentWorkout_1.exercises.push(workoutExercise_1);
                _this.diaryProvider.createWorkoutExercise(workoutExercise_1).then(function (data) {
                    currentWorkout_1.id = data.workout_id;
                    workoutExercise_1.id = data.id;
                });
            }
        });
        modal.present();
    };
    DiaryPage.prototype.openNotifications = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__modals_notifications_notifications__["a" /* NotificationsModal */]);
        modal.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Slides */]),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Slides */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Slides */]) === "function" && _a || Object)
    ], DiaryPage.prototype, "slides", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_4_ion_datepicker__["a" /* DatePickerDirective */]),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4_ion_datepicker__["a" /* DatePickerDirective */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ion_datepicker__["a" /* DatePickerDirective */]) === "function" && _b || Object)
    ], DiaryPage.prototype, "datepicker", void 0);
    DiaryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-diary',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\strengthsheet\mobile\src\pages\diary\diary.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>Diary</ion-title>\n    \n        <ion-buttons end>\n            <button ion-button icon-only notifications tappable (click)="openNotifications()">\n                <ion-icon name="notifications" ></ion-icon>\n                <ion-badge color="danger" *ngIf="notificationCount > 0">{{notificationCount}}</ion-badge>\n            </button>\n        </ion-buttons>    \n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n   \n\n    <div class="date-changer">\n        <ion-icon tappable ios="ios-arrow-back" md="ios-arrow-back" (click)="changeDay(-1)"></ion-icon>\n        <span tappable ion-datepicker [markDates]="markedWorkoutDates" (ionChanged)="changeDate($event)">{{getSelectedDate()}}</span>\n        <ion-icon tappable ios="ios-arrow-forward" md="ios-arrow-forward" (click)="changeDay(1)"></ion-icon>\n    </div>    \n    \n    <ion-slides initialSlide="7" (ionSlideDidChange)="workoutChanged()">\n\n        <ion-slide style="background-color:#ececec;" *ngFor="let slide of workoutSlides; let i = index" >\n            \n            <div class="diary-loading" *ngIf="workouts[i].loading">\n                <ion-spinner></ion-spinner>\n            </div>\n   \n            <div class="diary-empty" *ngIf="workouts[i].exercises.length < 1 && !workouts[i].loading">\n                <ion-icon name=\'bookmarks\'></ion-icon>\n                Diary Empty\n            </div>                   \n                   \n            <ion-list class=\'diary-exercise-list\' *ngIf="!workouts[i].loading">\n              <ion-item *ngFor="let exercise of workouts[i].exercises; let i = index" (click)="openEditExerciseModal(exercise, i)">\n                  <h2>{{exercise.exercise.name}}</h2>\n                  <p>\n                    {{getSetString(exercise)}}\n                  </p>                  \n\n                  <ion-icon ios="ios-arrow-forward" md="ios-arrow-forward" item-end [ngClass]="{\'has-notes\' : exercise.notes || exercise.video}"></ion-icon>\n              </ion-item>\n \n                \n                \n            </ion-list>            \n            \n            \n        </ion-slide>\n\n    </ion-slides>\n  \n  \n    <ion-fab bottom right>\n        <button ion-fab color="primary" (click)="openAddDiaryModal()">\n            <ion-icon name="add"></ion-icon>\n        </button>\n    </ion-fab>  \n  \n</ion-content>\n'/*ion-inline-end:"D:\Taylor\Documents\Websites\strengthsheet\mobile\src\pages\diary\diary.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_8__providers_diary_diary__["a" /* DiaryProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__providers_diary_diary__["a" /* DiaryProvider */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_9__providers_notification_notification__["a" /* NotificationProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__providers_notification_notification__["a" /* NotificationProvider */]) === "function" && _l || Object])
    ], DiaryPage);
    return DiaryPage;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
}());

//# sourceMappingURL=diary.js.map

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_transfer__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_request_request__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ProfileModal = (function () {
    function ProfileModal(platform, params, modalCtrl, loadingCtrl, viewCtrl, camera, storage, alertCtrl, events, transfer, requestProvider) {
        this.platform = platform;
        this.params = params;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.viewCtrl = viewCtrl;
        this.camera = camera;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.transfer = transfer;
        this.requestProvider = requestProvider;
        this.profile = this.params.data.profile;
    }
    ProfileModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    ProfileModal.prototype.formatDate = function (date) {
        return __WEBPACK_IMPORTED_MODULE_6_moment__(date).format("dddd, MMMM Do YYYY");
    };
    ProfileModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'profile',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\strengthsheet\mobile\src\modals\profile\profile.html"*/'<ion-header class="profile-nav">\n    <ion-toolbar color="primary">\n        <ion-title>\n            Profile\n        </ion-title>\n        <ion-buttons start>\n\n\n            \n            <button ion-button (click)="dismiss()">\n                <span ion-text showWhen="ios">Cancel</span>\n                <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n            </button>\n        </ion-buttons>\n  \n    </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content>\n    \n    \n    <div class="profile-header">\n        \n        <div class="profile-dp">\n            <img [src]="profile.avatar ? profile.avatar : \'http://websites.localhost/strengthsheet/api/uploads/profile.jpg\'"/>\n        </div>\n        \n\n        <h2>{{profile.name}}</h2>\n        <p>{{profile.email}}</p>\n\n\n    </div>\n    \n    \n        <ion-list class="profile-content">\n            <ion-item>\n                <ion-icon name="person" item-start></ion-icon>\n                <h2>Display Name</h2>\n                <p>{{profile.name}}</p>\n            </ion-item>\n            <ion-item>\n                <ion-icon name="mail" item-start></ion-icon>\n                <h2>Email</h2>\n                <p>{{profile.email}}</p>\n            </ion-item> \n            <ion-item *ngIf="profile.phone">\n                <ion-icon name="call" item-start></ion-icon>\n                <h2>Phone</h2>\n                <p>{{profile.phone}}</p>\n            </ion-item>  \n            <ion-item *ngIf="profile.address">\n                <ion-icon name="pin" item-start></ion-icon>\n                <h2>Address</h2>\n                <p>{{profile.address}}</p>\n            </ion-item>  \n            <ion-item *ngIf="profile.gender">\n                <ion-icon name="body" item-start></ion-icon>\n                <h2>Gender</h2>\n                <p>{{profile.gender}}</p>\n            </ion-item>  \n            <ion-item *ngIf="profile.phone">\n                <ion-icon name="heart" item-start></ion-icon>\n                <h2>Date Of Birth</h2>\n                <p>{{formatDate(profile.dob)}}</p>\n            </ion-item>  \n            <ion-item *ngIf="profile.about">\n                <ion-icon name="help" item-start></ion-icon>\n                <h2>About</h2>\n                <p class="extended">{{profile.about}}</p>\n            </ion-item>            \n        </ion-list>        \n    \n        \n</ion-content>\n'/*ion-inline-end:"D:\Taylor\Documents\Websites\strengthsheet\mobile\src\modals\profile\profile.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_transfer__["a" /* FileTransfer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_transfer__["a" /* FileTransfer */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_5__providers_request_request__["a" /* RequestProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__providers_request_request__["a" /* RequestProvider */]) === "function" && _l || Object])
    ], ProfileModal);
    return ProfileModal;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_settings__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var MessageProvider = (function () {
    function MessageProvider(http, storage, events, app) {
        this.http = http;
        this.storage = storage;
        this.events = events;
        this.app = app;
    }
    MessageProvider.prototype.getConversations = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("token").then(function (token) {
                if (token) {
                    _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + '/conversations?token=' + token + '&search=' + query.search + '&page=' + query.page + '&limit=' + query.limit).subscribe(function (res) {
                        resolve(res);
                    }, function (e) {
                        if (e && e.error && e.error.error && e.error.error.status_code === 401) {
                            //token expired, logout
                            _this.storage.clear();
                            _this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */]);
                            _this.app.getRootNav().popToRoot();
                        }
                        reject(e);
                    });
                }
                else {
                    reject();
                }
            });
        });
    };
    MessageProvider.prototype.getConversation = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("token").then(function (token) {
                if (token) {
                    _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + '/conversations/' + id + '?token=' + token).subscribe(function (res) {
                        resolve(res.conversation);
                    }, function (e) {
                        reject(e);
                    });
                }
                else {
                    reject();
                }
            });
        });
    };
    MessageProvider.prototype.createConversationMessage = function (message) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("token").then(function (token) {
                if (token) {
                    _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + '/conversationmessages?token=' + token, message).subscribe(function (res) {
                        console.log(res);
                        resolve(res.conversation_message);
                    }, function (e) {
                        reject(e);
                    });
                }
                else {
                    reject();
                }
            });
        });
    };
    MessageProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* App */]])
    ], MessageProvider);
    return MessageProvider;
}());

//# sourceMappingURL=message.js.map

/***/ }),

/***/ 128:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 128;

/***/ }),

/***/ 169:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 169;

/***/ }),

/***/ 30:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppSettings; });
var AppSettings = (function () {
    function AppSettings() {
    }
    AppSettings.apiUrl = 'http://websites.localhost/strengthsheet/api/public/api';
    AppSettings.uploadUrl = 'http://websites.localhost/strengthsheet/api/uploads';
    return AppSettings;
}());

//# sourceMappingURL=app.settings.js.map

/***/ }),

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddExerciseModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_exercise_exercise__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AddExerciseModal = (function () {
    function AddExerciseModal(platform, params, viewCtrl, toastCtrl, exerciseProvider, storage, alertCtrl, events) {
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.exerciseProvider = exerciseProvider;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.properties = { loading: false, search: "", page: 1, limit: 50 };
        this.exercises = { count: 0, data: [] };
        this.getExercises();
    }
    AddExerciseModal.prototype.getExercises = function () {
        var _this = this;
        this.properties.loading = true;
        this.exerciseProvider.getExercises(this.properties).then(function (data) {
            _this.exercises = data;
            _this.properties.loading = false;
        }).catch(function () {
            _this.properties.loading = false;
        });
    };
    AddExerciseModal.prototype.searchStarted = function () {
        var _this = this;
        this.properties.page = 1;
        this.exerciseProvider.getExercises(this.properties).then(function (data) {
            _this.exercises = data;
        });
    };
    AddExerciseModal.prototype.searchCancelled = function () {
        var _this = this;
        this.properties.search = '';
        this.properties.page = 1;
        this.exerciseProvider.getExercises(this.properties).then(function (data) {
            _this.exercises = data;
        });
    };
    AddExerciseModal.prototype.addExercise = function (exercise) {
        this.viewCtrl.dismiss(exercise);
    };
    AddExerciseModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    AddExerciseModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'add-exercise',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\strengthsheet\mobile\src\modals\add-exercise\add-exercise.html"*/'<ion-header>\n    <ion-toolbar color="primary">\n        <ion-title>\n            Add To Diary\n        </ion-title>\n        <ion-buttons start>\n            <button ion-button (click)="dismiss()">\n                <span ion-text showWhen="ios">Cancel</span>\n                <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content>\n    \n    \n    <ion-searchbar\n        [(ngModel)]="properties.search"\n        [showCancelButton]="shouldShowCancel"\n        (ionInput)="searchStarted()"\n        (ionCancel)="searchCancelled()"\n        placeholder="Search Exercises"\n        class="flat-search">\n    </ion-searchbar>   \n \n    <div class="diary-loading exercise-loading" *ngIf="properties.loading">\n        <ion-spinner></ion-spinner>\n    </div>\n\n    \n    \n    <ion-list class="add-diary-list">\n        <button ion-item detail-none *ngFor="let exercise of exercises.data; let i = index" (click)="addExercise(exercise)">\n            {{exercise.name}}\n            <ion-icon ios="ios-arrow-forward" md="ios-arrow-forward" item-end ></ion-icon>\n        </button> \n        <ion-item class="create-exercise" detail-none *ngIf="properties.search && exercises.data.length < 1">\n            Can\'t find {{properties.search}}<br>\n        </ion-item>                \n    </ion-list>  \n   \n    \n\n    \n</ion-content>'/*ion-inline-end:"D:\Taylor\Documents\Websites\strengthsheet\mobile\src\modals\add-exercise\add-exercise.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__providers_exercise_exercise__["a" /* ExerciseProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]])
    ], AddExerciseModal);
    return AddExerciseModal;
}());

//# sourceMappingURL=add-exercise.js.map

/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExerciseProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_settings__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ExerciseProvider = (function () {
    function ExerciseProvider(http, storage, events) {
        this.http = http;
        this.storage = storage;
        this.events = events;
    }
    ExerciseProvider.prototype.getExercises = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("token").then(function (token) {
                if (token) {
                    _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + '/exercises?token=' + token + '&search=' + query.search + '&page=' + query.page + '&limit=' + query.limit).subscribe(function (res) {
                        resolve(res);
                    }, function (e) {
                        reject(e);
                    });
                }
                else {
                    reject();
                }
            });
        });
    };
    ExerciseProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Events */]])
    ], ExerciseProvider);
    return ExerciseProvider;
}());

//# sourceMappingURL=exercise.js.map

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditDiaryExerciseModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_transfer__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_app_settings__ = __webpack_require__(30);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var EditDiaryExerciseModal = (function () {
    function EditDiaryExerciseModal(navCtrl, platform, params, events, viewCtrl, storage, alertCtrl, iab, camera, transfer, file) {
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.params = params;
        this.events = events;
        this.viewCtrl = viewCtrl;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.iab = iab;
        this.camera = camera;
        this.transfer = transfer;
        this.file = file;
        this.properties = {};
        this.exercise = {};
        Object.assign(this.exercise, this.params.data.exercise);
        this.exercise.rpe = this.exercise.rpe ? this.exercise.rpe : 8;
        this.exercise.rpeScaled = parseFloat(this.exercise.rpe) * 10;
        console.log(this.exercise);
    }
    EditDiaryExerciseModal.prototype.changeRpe = function (amount) {
        this.exercise.rpeScaled = this.exercise.rpeScaled + amount;
        if (this.exercise.rpeScaled < 60) {
            this.exercise.rpeScaled = 60;
        }
        else if (this.exercise.rpeScaled > 100) {
            this.exercise.rpeScaled = 100;
        }
    };
    EditDiaryExerciseModal.prototype.determinePercentage = function () {
        var reps = this.exercise.reps ? this.exercise.reps : 0;
        var percentages = { 0: 0, 1: 100, 2: 95, 3: 90, 4: 88, 5: 86, 6: 83, 7: 80, 8: 78, 9: 76, 10: 75, 11: 72, 12: 70, 13: 66, 14: 63, 15: 60 };
        var repRounded = Math.floor(reps);
        this.exercise.percentage = repRounded > 15 ? 50 : percentages[repRounded];
        ;
    };
    EditDiaryExerciseModal.prototype.viewVideo = function (video) {
        window.open(video, '_system');
    };
    EditDiaryExerciseModal.prototype.uploadVideo = function () {
        var _this = this;
        var cameraOptions = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.FILE_URI,
            mediaType: this.camera.MediaType.VIDEO
        };
        this.camera.getPicture(cameraOptions)
            .then(function (image) {
            _this.properties.uploadingVideo = true;
            var fileTransfer = _this.transfer.create();
            var options = {
                fileKey: "fileToUpload",
                fileName: _this.exercise.id,
                mimeType: "video/mp4"
            };
            fileTransfer.upload(image, encodeURI(__WEBPACK_IMPORTED_MODULE_7__app_app_settings__["a" /* AppSettings */].apiUrl + "/upload"), options).then(function (data) {
                _this.exercise.video = data.response;
                _this.properties.uploadingVideo = false;
            }, function (err) {
                _this.properties.uploadingVideo = false;
                var alert = _this.alertCtrl.create({
                    title: "Error",
                    subTitle: "There was a problem uploading your video",
                    message: JSON.stringify(err),
                    buttons: [
                        {
                            text: 'Dismiss',
                            role: 'cancel'
                        }
                    ]
                });
                alert.present();
            });
        }, function (err) {
            //console.log(err)
        });
    };
    EditDiaryExerciseModal.prototype.update = function () {
        this.exercise.rpe = this.exercise.rpeScaled / 10;
        this.viewCtrl.dismiss(this.exercise);
    };
    EditDiaryExerciseModal.prototype.openDelete = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: "Delete Exercise",
            message: "Are you sure you want to delete this exercise?",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Yes',
                    handler: function (data) {
                        _this.viewCtrl.dismiss({ id: _this.exercise.id, deleted: true });
                    }
                }
            ]
        });
        alert.present();
    };
    EditDiaryExerciseModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    EditDiaryExerciseModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'edit-diary-exercise',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\strengthsheet\mobile\src\modals\edit-diary-exercise\edit-diary-exercise.html"*/'<ion-header>\n    <ion-toolbar color="primary">\n        <ion-title>\n            {{exercise.exercise.name}}\n        </ion-title>\n        <ion-buttons start>\n            \n            <button icon-start ion-button (click)="openDelete()" showWhen="android, windows">\n                <ion-icon name="md-trash"></ion-icon>\n                Delete\n            </button> \n\n            \n            <button ion-button (click)="dismiss()">\n                <span ion-text showWhen="ios">Cancel</span>\n                <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n            </button>\n        </ion-buttons>\n        \n        \n        <ion-buttons showWhen="ios" end>    \n            <button ion-button (click)="openDelete()">\n                <span ion-text>Delete</span>\n            </button>              \n        </ion-buttons>    \n  \n    </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content>\n    \n    \n<ion-list class="edit-set">\n    \n    <ion-item>\n        <ion-label floating>Sets</ion-label>\n        <ion-input type="number" [(ngModel)]="exercise.sets"></ion-input>\n    </ion-item>    \n\n    <ion-item>\n        <ion-label floating>Reps</ion-label>\n        <ion-input type="number" [(ngModel)]="exercise.reps"></ion-input>\n    </ion-item>\n\n    <ion-item>\n        <ion-label floating>Weight</ion-label>\n        <ion-input type="number" [(ngModel)]="exercise.weight"></ion-input>\n    </ion-item>\n    \n    \n    <ion-list-header class="rpe-header">\n        RPE\n        <ion-badge item-end>{{exercise.rpeScaled / 10}}</ion-badge>\n    </ion-list-header>    \n    <ion-item>\n        <ion-range [(ngModel)]="exercise.rpeScaled" min="60" max="100">\n            <ion-icon range-left name="remove" (click)="changeRpe(-5)"></ion-icon>\n            <ion-icon range-right name="add" (click)="changeRpe(5)"></ion-icon>\n        </ion-range>\n    </ion-item>    \n    \n    <ion-item>\n        <ion-label floating>Intensity (%)</ion-label>\n        <ion-input type="number" [(ngModel)]="exercise.percentage"></ion-input>\n        <button ion-button outline item-end (click)="determinePercentage()">Calculate</button>\n    </ion-item>\n    \n\n    <ion-item class="set-notes">\n        <ion-label floating>Notes</ion-label>\n        <ion-textarea [(ngModel)]="exercise.notes" autosize></ion-textarea>\n    </ion-item>    \n    \n    <ion-item>\n        <ion-label floating>Video</ion-label>\n        <ion-input type="text" [(ngModel)]="exercise.video"></ion-input>\n        <button ion-button outline item-end (click)="viewVideo(exercise.video)" *ngIf="exercise.video">View</button>\n        <button ion-button outline item-end (click)="uploadVideo()" [disabled]="properties.uploadingVideo">\n            <ion-spinner class="add-friend-loading" *ngIf="properties.uploadingVideo"></ion-spinner>\n            Upload\n        </button>\n    </ion-item>    \n    \n</ion-list>\n        \n        \n</ion-content>\n\n\n\n<ion-footer>\n    <button ion-button full color="primary" (click)="update()">Update Exercise</button>\n\n</ion-footer>'/*ion-inline-end:"D:\Taylor\Documents\Websites\strengthsheet\mobile\src\modals\edit-diary-exercise\edit-diary-exercise.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__["a" /* InAppBrowser */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__["a" /* InAppBrowser */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_transfer__["a" /* FileTransfer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_transfer__["a" /* FileTransfer */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__["a" /* File */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__["a" /* File */]) === "function" && _l || Object])
    ], EditDiaryExerciseModal);
    return EditDiaryExerciseModal;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
}());

//# sourceMappingURL=edit-diary-exercise.js.map

/***/ }),

/***/ 345:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationsModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_transfer__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_notification_notification__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_diary_diary__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_message_message__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modals_requests_requests__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var NotificationsModal = (function () {
    function NotificationsModal(platform, app, params, nav, modalCtrl, loadingCtrl, viewCtrl, camera, storage, alertCtrl, events, transfer, notificationProvider) {
        var _this = this;
        this.platform = platform;
        this.app = app;
        this.params = params;
        this.nav = nav;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.viewCtrl = viewCtrl;
        this.camera = camera;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.transfer = transfer;
        this.notificationProvider = notificationProvider;
        this.properties = { loading: false, limit: 10, page: 1 };
        this.notifications = { data: [], count: 0 };
        this.getNotifications();
        this.events.subscribe("notification:received", function (notification) {
            _this.properties.page = 1;
            _this.getNotifications();
        });
    }
    NotificationsModal.prototype.getNotifications = function () {
        var _this = this;
        this.properties.loading = true;
        this.notificationProvider.getNotifications(this.properties).then(function (data) {
            _this.notifications = data;
            _this.properties.loading = false;
        }).catch(function () {
            _this.properties.loading = false;
        });
    };
    NotificationsModal.prototype.getMoreNotifications = function (infiniteScroll) {
        var _this = this;
        this.properties.page = this.properties.page + 1;
        this.notificationProvider.getNotifications(this.properties).then(function (data) {
            for (var _i = 0, _a = data["data"]; _i < _a.length; _i++) {
                var item = _a[_i];
                _this.notifications.data.push(item);
            }
            infiniteScroll.complete();
        })
            .catch(function (e) {
            infiniteScroll.complete();
        });
    };
    NotificationsModal.prototype.openNotification = function (notification) {
        //update as seen in api
        //go to item in app
        var _this = this;
        if (!notification.seen) {
            notification.seen = true;
            this.notificationProvider.updateNotification({ seen: true, id: notification.id }).then(function () {
                _this.events.publish("notification:viewed");
            });
        }
        if (notification.notification_type === "diary") {
            var workoutDate = notification.source_id.split(":")[1];
            this.nav.push(__WEBPACK_IMPORTED_MODULE_6__pages_diary_diary__["a" /* DiaryPage */], { date: workoutDate });
        }
        else if (notification.notification_type === "message") {
            this.nav.push(__WEBPACK_IMPORTED_MODULE_7__pages_message_message__["a" /* MessagePage */], { conversation: { id: notification.source_id } });
        }
        else if (notification.notification_type === "request") {
            var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__modals_requests_requests__["a" /* RequestsModal */]);
            modal.present();
        }
        else {
            var alert = this.alertCtrl.create({
                title: 'Notification type: ' + notification.notification_type,
                subTitle: "Created " + this.formatDate(notification.created_at),
                message: "Intiated by " + notification.name,
                buttons: ['Dismiss']
            });
            alert.present();
        }
    };
    NotificationsModal.prototype.formatDate = function (date) {
        return __WEBPACK_IMPORTED_MODULE_9_moment__(date).fromNow();
    };
    NotificationsModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    NotificationsModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'notifications',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\strengthsheet\mobile\src\modals\notifications\notifications.html"*/'<ion-header>\n    <ion-toolbar color="primary">\n        <ion-title>\n            Notifications\n        </ion-title>\n        <ion-buttons start>\n\n\n            \n            <button ion-button (click)="dismiss()">\n                <span ion-text showWhen="ios">Cancel</span>\n                <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n            </button>\n        </ion-buttons>\n  \n    </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n\n    <div class="diary-loading" *ngIf="properties.loading">\n        <ion-spinner></ion-spinner>\n    </div>\n    \n    <div class="diary-empty empty-state" *ngIf="!properties.loading && notifications.data.length < 1">\n        <ion-icon name=\'notifications\'></ion-icon>\n        No Notifications\n    </div>    \n    \n    \n    <ion-list class="friends-list">           \n        <ion-item *ngFor="let notification of notifications.data; let i = index" (click)="openNotification(notification)" [ngClass]="{\'not-seen\' : !notification.seen}">\n            <ion-avatar item-start>\n                <img [src]="notification.avatar">\n            </ion-avatar>            \n            <h2>\n                <span *ngIf="notification.notification_type === \'diary\'">Diary Updated</span>\n                <span *ngIf="notification.notification_type === \'message\'">Message Received</span>\n                <span *ngIf="notification.notification_type === \'request\'">Coach Request</span>\n                <span *ngIf="notification.notification_type === \'event\'">Event Reminder</span>\n                <span *ngIf="notification.notification_type === \'request_accepted\'">Request Accepted</span>\n                <ion-note>{{formatDate(notification.created_at)}}</ion-note>\n            </h2>\n            <p>\n                <span *ngIf="notification.notification_type === \'diary\'">{{notification.name}} has updated your diary</span>\n                <span *ngIf="notification.notification_type === \'message\'">{{notification.name}} sent you a message</span>\n                <span *ngIf="notification.notification_type === \'request\'">{{notification.name}} wants to be your coach</span>\n                <span *ngIf="notification.notification_type === \'event\'">An event is approaching soon!</span>\n                <span *ngIf="notification.notification_type === \'request_accepted\'">{{notification.name}} accepted your coach request</span>\n            </p>\n        </ion-item>  \n    </ion-list>\n\n\n    <ion-infinite-scroll (ionInfinite)="getMoreNotifications($event)">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n    </ion-infinite-scroll>   \n\n</ion-content>\n\n'/*ion-inline-end:"D:\Taylor\Documents\Websites\strengthsheet\mobile\src\modals\notifications\notifications.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_transfer__["a" /* FileTransfer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_transfer__["a" /* FileTransfer */]) === "function" && _m || Object, typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_5__providers_notification_notification__["a" /* NotificationProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__providers_notification_notification__["a" /* NotificationProvider */]) === "function" && _o || Object])
    ], NotificationsModal);
    return NotificationsModal;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
}());

//# sourceMappingURL=notifications.js.map

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DiaryProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_settings__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var DiaryProvider = (function () {
    function DiaryProvider(http, storage, app) {
        this.http = http;
        this.storage = storage;
        this.app = app;
    }
    DiaryProvider.prototype.createWorkoutExercise = function (exercise) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("token").then(function (token) {
                if (token) {
                    _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/workoutexercises?token=" + token, exercise).subscribe(function (res) {
                        resolve(res.workout_exercise);
                    }, function (e) {
                        reject(e);
                    });
                }
                else {
                    reject();
                }
            });
        });
    };
    DiaryProvider.prototype.updateWorkoutExercise = function (exercise) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("token").then(function (token) {
                if (token) {
                    _this.http.put(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/workoutexercises/" + exercise.id + "?token=" + token, exercise).subscribe(function (res) {
                        resolve(res);
                    }, function (e) {
                        reject(e);
                    });
                }
                else {
                    reject();
                }
            });
        });
    };
    DiaryProvider.prototype.deleteWorkoutExercise = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("token").then(function (token) {
                if (token) {
                    _this.http.delete(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/workoutexercises/" + id + "?token=" + token).subscribe(function (res) {
                        resolve(res);
                    }, function (e) {
                        reject(e);
                    });
                }
                else {
                    reject();
                }
            });
        });
    };
    DiaryProvider.prototype.getWorkout = function (clientId, date) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("token").then(function (token) {
                if (token) {
                    _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + '/workouts/' + clientId + '?token=' + token + '&date=' + date + '&client_user_id=' + clientId).subscribe(function (res) {
                        resolve(res.workouts);
                    }, function (e) {
                        if (e && e.error && e.error.error && e.error.error.status_code === 401) {
                            //token expired, logout
                            _this.storage.clear();
                            _this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */]);
                            _this.app.getRootNav().popToRoot();
                        }
                        reject(e);
                    });
                }
                else {
                    reject();
                }
            });
        });
    };
    DiaryProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* App */]])
    ], DiaryProvider);
    return DiaryProvider;
}());

//# sourceMappingURL=diary.js.map

/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_authentication_authentication__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__diary_diary__ = __webpack_require__(112);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SignupPage = (function () {
    function SignupPage(navCtrl, navParams, events, authProvider, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.authProvider = authProvider;
        this.alertCtrl = alertCtrl;
        this.profile = {};
        this.user = { email: "", password: "", permission: "customer", loading: false };
    }
    SignupPage.prototype.signup = function () {
        var _this = this;
        this.user.loading = true;
        this.user.error = "";
        this.user.email = this.profile.public_email;
        this.authProvider.register(this.user).then(function () {
            _this.user.loading = false;
            _this.authProvider.getUserData();
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__diary_diary__["a" /* DiaryPage */]);
            _this.navCtrl.popToRoot();
        }).catch(function (e) {
            _this.user.loading = false;
            if (e && e.error) {
                for (var _i = 0, _a = e.error.error.errors; _i < _a.length; _i++) {
                    var error = _a[_i];
                    _this.user.error = _this.user.error + error + " ";
                }
            }
            else {
                _this.user.error = e.message;
            }
        });
    };
    SignupPage.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
    SignupPage.prototype.login = function () {
        this.navCtrl.pop();
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\strengthsheet\mobile\src\pages\signup\signup.html"*/'<ion-header>\n  <ion-navbar color="primary">\n        <ion-title>Signup</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n    <ion-list class="signup-form">\n\n        <ion-item>\n            <ion-label floating>Name</ion-label>\n            <ion-input clearInput type="text" [(ngModel)]="user.name"></ion-input>\n        </ion-item>        \n        \n        \n        \n        <ion-item>\n            <ion-label floating>Email</ion-label>\n            <ion-input clearInput type="text" [(ngModel)]="user.email"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label floating>Password</ion-label>\n            <ion-input clearInput type="password" [(ngModel)]="user.password"></ion-input>\n        </ion-item>\n\n        \n        <p class="login-error" *ngIf="user.error">{{user.error}}</p>\n\n        \n        \n    </ion-list>\n</ion-content>\n\n<ion-footer>\n\n    <button ion-button full color=\'primary\' class="login-button" [disabled]="user.loading" (click)="signup()">\n        Get Started&nbsp;&nbsp;\n        <ion-icon name="arrow-forward"></ion-icon>\n        <ion-spinner *ngIf="user.loading"></ion-spinner>\n    </button>\n</ion-footer>\n'/*ion-inline-end:"D:\Taylor\Documents\Websites\strengthsheet\mobile\src\pages\signup\signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2__providers_authentication_authentication__["a" /* AuthenticationProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modals_requests_requests__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__message_message__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_message_message__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MessagesPage = (function () {
    function MessagesPage(navCtrl, params, modalCtrl, storage, events, alertCtrl, plt, messageProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.params = params;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.plt = plt;
        this.messageProvider = messageProvider;
        this.properties = { loading: false, search: "", page: 1, limit: 99 };
        this.conversations = { count: 0, data: [] };
        this.getConversations();
        this.user = {};
        this.storage.get("user").then(function (user) {
            if (user) {
                _this.user = user;
            }
        });
        this.events.subscribe("message:created", function () {
            _this.getConversations();
        });
        this.events.subscribe("notification:received", function (notification) {
            if (notification.type === "message") {
                _this.getConversations();
            }
        });
    }
    MessagesPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.messageProvider.getConversations(this.properties).then(function (data) {
            _this.conversations = data;
            refresher.complete();
        }).catch(function () {
            refresher.complete();
        });
    };
    MessagesPage.prototype.getConversations = function () {
        var _this = this;
        this.properties.loading = true;
        this.messageProvider.getConversations(this.properties).then(function (data) {
            _this.properties.loading = false;
            console.log(data);
            _this.conversations = data;
        }).catch(function () {
            _this.properties.loading = false;
        });
    };
    MessagesPage.prototype.goToConversation = function (conversation) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__message_message__["a" /* MessagePage */], { conversation: conversation });
    };
    MessagesPage.prototype.openRequests = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__modals_requests_requests__["a" /* RequestsModal */]);
        modal.present();
    };
    MessagesPage.prototype.formatDate = function (date) {
        return __WEBPACK_IMPORTED_MODULE_6_moment__(date).fromNow();
    };
    MessagesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-messages',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\strengthsheet\mobile\src\pages\messages\messages.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>Messages</ion-title>\n    \n        <ion-buttons end>\n            <button ion-button icon-only tappable (click)="openRequests()">\n                <ion-icon name="person-add" ></ion-icon>\n                <ion-badge color="danger" *ngIf="requestCount > 0">{{requestCount}}</ion-badge>\n            </button>\n        </ion-buttons>    \n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n    \n    <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content></ion-refresher-content>\n    </ion-refresher>     \n    \n    <div class="diary-loading" *ngIf="properties.loading">\n        <ion-spinner></ion-spinner>\n    </div>\n    \n    <div class="diary-empty empty-state" *ngIf="!properties.loading && conversations.data.length < 1">\n        <ion-icon name=\'chatbubbles\'></ion-icon>\n        No Messages\n    </div>\n\n    \n    <ion-list class="messages-list" *ngIf="!properties.loading">\n        <ion-item *ngFor="let conversation of conversations.data" (click)="goToConversation(conversation)" [ngClass]="{\'requires-reply\':conversation.latest_message.user_id !== user.id}">\n            <ion-avatar item-start>\n                <img [src]="conversation.participants[0].profile.avatar ? conversation.participants[0].profile.avatar : \'http://websites.localhost/strengthsheet/api/uploads/profile.jpg\'">\n              </ion-avatar>\n            <ion-label>\n\n                <h2>\n                    <span *ngFor="let participant of conversation.participants; let i = index">\n                        <span *ngIf="i !== 0">, </span>\n                        {{participant.profile.name}}\n                    </span>\n                </h2>\n                <p *ngIf="conversation.latest_message.message">{{conversation.latest_message.message}}</p>\n                <p *ngIf="conversation.latest_message.file">File Received</p>\n            </ion-label>\n\n            <ion-note item-end>{{formatDate(conversation.latest_message.created_at)}}</ion-note>\n\n        </ion-item>\n    </ion-list>\n    \n    \n</ion-content>\n'/*ion-inline-end:"D:\Taylor\Documents\Websites\strengthsheet\mobile\src\pages\messages\messages.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_4__providers_message_message__["a" /* MessageProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_message_message__["a" /* MessageProvider */]) === "function" && _h || Object])
    ], MessagesPage);
    return MessagesPage;
    var _a, _b, _c, _d, _e, _f, _g, _h;
}());

//# sourceMappingURL=messages.js.map

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestsModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_transfer__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modals_profile_profile__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_request_request__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var RequestsModal = (function () {
    function RequestsModal(platform, params, modalCtrl, loadingCtrl, viewCtrl, camera, storage, alertCtrl, events, transfer, requestProvider) {
        this.platform = platform;
        this.params = params;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.viewCtrl = viewCtrl;
        this.camera = camera;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.transfer = transfer;
        this.requestProvider = requestProvider;
        this.properties = { loading: false };
        this.requests = [];
        this.getRequests();
    }
    RequestsModal.prototype.getRequests = function () {
        var _this = this;
        this.properties.loading = true;
        this.requestProvider.getRequests().then(function (data) {
            _this.properties.loading = false;
            _this.requests = data ? data : [];
        }).catch(function () {
            _this.properties.loading = false;
        });
    };
    RequestsModal.prototype.viewProfile = function (profile) {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__modals_profile_profile__["a" /* ProfileModal */], { profile: profile });
        modal.present();
    };
    RequestsModal.prototype.acceptRequest = function (request, index, ev) {
        var _this = this;
        ev.stopPropagation();
        var alert = this.alertCtrl.create({
            title: "Confirm",
            subTitle: "Are you sure you want to accept this request?",
            message: "This coach will be able to view and modify your profile and diary once you accept.",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Yes',
                    handler: function (data) {
                        var name = request.profile.name;
                        _this.requests.splice(index, 1);
                        _this.requestProvider.acceptRequest(request.id).then(function () {
                            _this.events.publish("request:accepted");
                            var alert = _this.alertCtrl.create({
                                title: "Success",
                                message: name + " is now your coach.",
                                buttons: [
                                    {
                                        text: 'Dismiss',
                                        role: 'cancel'
                                    }
                                ]
                            });
                            alert.present();
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    RequestsModal.prototype.declineRequest = function (request, index, ev) {
        var _this = this;
        ev.stopPropagation();
        var alert = this.alertCtrl.create({
            title: "Confirm",
            subTitle: "Are you sure you want to decline this request?",
            message: "This coach will be notified and you will not be able to work together.",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Yes',
                    handler: function (data) {
                        _this.requests.splice(index, 1);
                        _this.requestProvider.declineRequest(request.id);
                    }
                }
            ]
        });
        alert.present();
    };
    RequestsModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    RequestsModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'requests',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\strengthsheet\mobile\src\modals\requests\requests.html"*/'<ion-header>\n    <ion-toolbar color="primary">\n        <ion-title>\n            Coach Requests\n        </ion-title>\n        <ion-buttons start>\n\n\n            \n            <button ion-button (click)="dismiss()">\n                <span ion-text showWhen="ios">Cancel</span>\n                <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n            </button>\n        </ion-buttons>\n  \n    </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content>\n    \n    \n    <div class="diary-loading" *ngIf="properties.loading">\n        <ion-spinner></ion-spinner>\n    </div>\n    \n    <div class="diary-empty empty-state" *ngIf="!properties.loading && requests.length < 1">\n        <ion-icon name=\'person-add\'></ion-icon>\n        No Pending Requests\n    </div>    \n    \n    \n    <ion-list class="friends-list">           \n        <ion-item *ngFor="let request of requests; let i = index" (click)="viewProfile(request.profile)">\n            <ion-avatar item-start>\n                <img [src]="request.profile.avatar ? request.profile.avatar : \'http://websites.localhost/strengthsheet/api/uploads/profile.jpg\'">\n            </ion-avatar>\n            <h2>{{request.profile.name}}</h2>\n            <p></p>\n            <button ion-button clear item-end (click)="declineRequest(request,i, $event)" color="danger">Decline</button>\n            <button ion-button clear item-end (click)="acceptRequest(request,i, $event)">Accept</button>\n\n        </ion-item>  \n    </ion-list>\n        \n        \n</ion-content>\n'/*ion-inline-end:"D:\Taylor\Documents\Websites\strengthsheet\mobile\src\modals\requests\requests.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_6__providers_request_request__["a" /* RequestProvider */]])
    ], RequestsModal);
    return RequestsModal;
}());

//# sourceMappingURL=requests.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_message_message__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MessagePage = (function () {
    function MessagePage(navCtrl, params, messageProvider, storage, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.params = params;
        this.messageProvider = messageProvider;
        this.storage = storage;
        this.events = events;
        this.properties = { loading: true };
        this.conversation = { id: this.params.data.conversation.id, participants: this.params.data.conversation.participants ? this.params.data.conversation.participants : [] };
        console.log(this.params);
        this.getConversation(this.params.data.conversation.id);
        this.user = {};
        this.storage.get("user").then(function (user) {
            if (user) {
                _this.user = user;
            }
        });
        this.pingInterval = setInterval(function () {
            _this.pingMessages();
        }, 20000);
        this.message = "";
        this.events.subscribe("notification:received", function (notification) {
            if (notification.type === "message" && notification.source_id === _this.conversation.id) {
                _this.pingMessages();
            }
        });
    }
    MessagePage.prototype.ionViewWillLeave = function () {
        clearInterval(this.pingInterval);
    };
    MessagePage.prototype.getConversation = function (id) {
        var _this = this;
        this.messageProvider.getConversation(id).then(function (data) {
            _this.properties.loading = false;
            _this.conversation = data;
            _this.calculateMessages();
            setTimeout(function () { _this.content.scrollToBottom(); }, 200);
            console.log(data);
        }).catch(function () {
            _this.properties.loading = false;
        });
    };
    MessagePage.prototype.pingMessages = function () {
        var _this = this;
        if (this.properties.loading) {
            return;
        }
        this.messageProvider.getConversation(this.conversation.id).then(function (data) {
            if (data.messages.length > _this.conversation.messages.length) {
                _this.conversation.participants = data.participants;
                _this.conversation.messages = data.messages;
                _this.calculateMessages();
                setTimeout(function () { _this.content.scrollToBottom(); }, 200);
            }
        }).catch(function () { });
    };
    MessagePage.prototype.getMessageTime = function (date) {
        return __WEBPACK_IMPORTED_MODULE_4_moment__(date).fromNow();
    };
    MessagePage.prototype.getAvatar = function (userId) {
        var avatar = 'http://websites.localhost/strengthsheet/api/uploads/profile.jpg';
        for (var _i = 0, _a = this.conversation.participants; _i < _a.length; _i++) {
            var participant = _a[_i];
            if (participant.user_id === userId && participant.profile.avatar) {
                avatar = participant.profile.avatar;
                break;
            }
        }
        console.log(avatar);
        return avatar;
    };
    MessagePage.prototype.calculateMessages = function () {
        for (var index in this.conversation.messages) {
            //check message before is befrom same user
            //check message after is from same user
            var indexInt = parseInt(index);
            var message = this.conversation.messages[indexInt];
            var previousMessage = this.conversation.messages[indexInt - 1];
            var nextMessage = this.conversation.messages[indexInt + 1];
            var isBefore = false;
            var isAfter = false;
            if (previousMessage && message.user_id === previousMessage.user_id) {
                isAfter = true;
            }
            if (nextMessage && message.user_id === nextMessage.user_id) {
                isBefore = true;
            }
            message.isBefore = isBefore;
            message.isAfter = isAfter;
        }
    };
    MessagePage.prototype.openLink = function (link) {
        window.open(link, '_system');
    };
    MessagePage.prototype.sendMessage = function () {
        var _this = this;
        if (!this.message) {
            return;
        }
        var message = { id: null, conversation_id: this.conversation.id, message: this.message, created: new Date(), user_id: this.user.id };
        this.conversation.messages.push(message);
        this.message = "";
        this.calculateMessages();
        setTimeout(function () { _this.content.scrollToBottom(); }, 200);
        this.messageProvider.createConversationMessage(message).then(function (data) {
            message.id = data["id"];
            _this.events.publish("message:created");
        }).catch(function () { });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]) === "function" && _a || Object)
    ], MessagePage.prototype, "content", void 0);
    MessagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-message',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\strengthsheet\mobile\src\pages\message\message.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>\n        {{conversation.participants.length < 1 ? \'Message\' : \'\'}}\n        <span *ngFor="let participant of conversation.participants; let i = index">\n            <span *ngIf="i !== 0">, </span>\n            {{participant.profile.name}}\n        </span>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n    \n    <div class="diary-loading" *ngIf="properties.loading">\n        <ion-spinner></ion-spinner>\n    </div>    \n\n    <ion-list class="message-list" *ngIf="!properties.loading">\n        <ion-item class="message" *ngFor="let message of conversation.messages" (click)="message.showTime = !message.showTime" [ngClass]="{\'to-message\':message.user_id === user.id, \'from-message\':message.user_id !== user.id, \'before\' : message.isBefore, \'after\' : message.isAfter, \'show-time\': message.showTime}" >\n            \n            <ion-avatar item-start *ngIf="message.user_id !== user.id">\n                <img [src]="getAvatar(message.user_id)">\n            </ion-avatar>              \n            <ion-note *ngIf="message.showTime">{{getMessageTime(message.created_at)}}</ion-note>\n            <p *ngIf="message.message">{{message.message}}</p>\n            <p *ngIf="message.file"><a (click)="openLink(message.file)">Open File</a></p>\n        </ion-item>\n        \n        \n    </ion-list>\n\n    \n \n</ion-content>\n\n\n\n<ion-footer class="diary-footer message-footer">\n        <form name="diary-exercise-form" (ngSubmit)="sendMessage()">\n            \n            <ion-input name="message" type="text" placeholder="Aa" [(ngModel)]="message"></ion-input>\n            <div class="button-container">\n                <button ion-button icon-only clear type="submit">\n                    <ion-icon name="send" ></ion-icon>\n                </button>\n            </div>\n        </form>\n</ion-footer>'/*ion-inline-end:"D:\Taylor\Documents\Websites\strengthsheet\mobile\src\pages\message\message.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__providers_message_message__["a" /* MessageProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_message_message__["a" /* MessageProvider */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]) === "function" && _f || Object])
    ], MessagePage);
    return MessagePage;
    var _a, _b, _c, _d, _e, _f;
}());

//# sourceMappingURL=message.js.map

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_authentication_authentication__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_request_request__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_email_composer__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modals_edit_profile_edit_profile__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modals_profile_profile__ = __webpack_require__(115);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SettingsPage = (function () {
    function SettingsPage(navCtrl, navParams, storage, events, emailComposer, modalCtrl, plt, authProvider, alertCtrl, authenticationProvider, requestProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.events = events;
        this.emailComposer = emailComposer;
        this.modalCtrl = modalCtrl;
        this.plt = plt;
        this.authProvider = authProvider;
        this.alertCtrl = alertCtrl;
        this.authenticationProvider = authenticationProvider;
        this.requestProvider = requestProvider;
        this.user = {};
        this.storage.get("user").then(function (user) {
            if (user) {
                _this.user = user;
                _this.authenticationProvider.getProfile(_this.user.id).then(function (data) {
                    console.log(data);
                    _this.client = data;
                });
            }
        });
        this.coaches = { count: 0, data: [] };
        this.getCoaches();
        this.events.subscribe("request:accepted", function () {
            _this.getCoaches();
        });
    }
    SettingsPage.prototype.openRate = function () {
        if (this.plt.is("ios")) {
            window.open("https://itunes.apple.com/", '_system');
        }
        else if (this.plt.is("windows")) {
            window.open("https://www.microsoft.com", '_system');
        }
        else {
            window.open("https://play.google.com/", '_system');
        }
    };
    SettingsPage.prototype.openFollow = function () {
        window.open("https://www.facebook.com/", '_system');
    };
    SettingsPage.prototype.openEmail = function () {
        var email = {
            to: ["taylordonhamling@gmail.com"],
            subject: 'Subject for your support query',
            body: 'Provide details about the support you require.',
            isHtml: true
        };
        this.emailComposer.open(email);
    };
    SettingsPage.prototype.getCoaches = function () {
        var _this = this;
        this.requestProvider.getCoaches().then(function (data) {
            _this.coaches = data;
        });
    };
    SettingsPage.prototype.viewProfile = function (profile) {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__modals_profile_profile__["a" /* ProfileModal */], { profile: profile });
        modal.present();
    };
    SettingsPage.prototype.openEditProfile = function () {
        var _this = this;
        console.log(this.user);
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__modals_edit_profile_edit_profile__["a" /* EditProfileModal */], { profile: this.client });
        modal.onDidDismiss(function (profile) {
            if (profile) {
                _this.client = profile;
                _this.authenticationProvider.updateProfile(_this.client);
            }
        });
        modal.present();
    };
    SettingsPage.prototype.removeCoach = function (coach, index, ev) {
        var _this = this;
        console.log(coach);
        ev.stopPropagation();
        var alert = this.alertCtrl.create({
            title: "Confirm",
            subTitle: "Are you sure you want to remove this coach?",
            message: "They will no longer be able to view or edit your profile or diary.",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Yes',
                    handler: function (data) {
                        _this.coaches.data.splice(index, 1);
                        _this.requestProvider.deleteCoach(coach.user_id);
                    }
                }
            ]
        });
        alert.present();
    };
    SettingsPage.prototype.openChangePassword = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Change Password',
            inputs: [
                {
                    name: 'password',
                    placeholder: 'Password',
                    type: 'password'
                },
                {
                    name: 'confirmPassword',
                    placeholder: 'Confirm Password',
                    type: 'password'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                    }
                },
                {
                    text: 'Change',
                    handler: function (data) {
                        if (data.password && data.confirmPassword && data.password === data.confirmPassword) {
                            _this.authProvider.changePassword(_this.user.email, data.password, data.confirmPassword).then(function () {
                                var alert = _this.alertCtrl.create({
                                    title: 'Success',
                                    message: 'Your password has been updated',
                                    buttons: [
                                        {
                                            text: 'Dismiss',
                                            role: 'cancel',
                                            handler: function (data) {
                                            }
                                        }
                                    ]
                                });
                                alert.present();
                            }).catch(function () {
                                var alert = _this.alertCtrl.create({
                                    title: 'Error',
                                    message: 'There was an error while changing your password.',
                                    buttons: [
                                        {
                                            text: 'Cancel',
                                            role: 'cancel',
                                            handler: function (data) {
                                            }
                                        },
                                        {
                                            text: 'Try Again',
                                            handler: function (data) {
                                                setTimeout(function () { _this.openChangePassword(); }, 200);
                                            }
                                        }
                                    ]
                                });
                                setTimeout(function () { alert.present(); }, 200);
                            });
                        }
                        else {
                            var alert_1 = _this.alertCtrl.create({
                                title: 'Error',
                                message: 'Passwords do not match',
                                buttons: [
                                    {
                                        text: 'Cancel',
                                        role: 'cancel',
                                        handler: function (data) {
                                        }
                                    },
                                    {
                                        text: 'Try Again',
                                        handler: function (data) {
                                            setTimeout(function () { _this.openChangePassword(); }, 200);
                                        }
                                    }
                                ]
                            });
                            setTimeout(function () { alert_1.present(); }, 200);
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    SettingsPage.prototype.logout = function () {
        this.authProvider.logout();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */]);
        this.navCtrl.popToRoot();
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-settings',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\strengthsheet\mobile\src\pages\settings\settings.html"*/'<!--\n  Generated template for the SettingsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar color="primary">\n  \n        \n        <ion-title>Settings</ion-title>\n    \n    </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n<ion-list class="settings-list">\n    \n    \n    <ion-list-header>\n        <h2>Support</h2>\n    </ion-list-header>  \n    \n <ion-item>\n    <ion-icon name="heart" item-start></ion-icon>\n    Rate The App\n    <button ion-button outline item-end (click)="openRate()">Rate</button>\n  </ion-item>    \n    \n    \n <ion-item>\n    <ion-icon name="logo-facebook" item-start></ion-icon>\n    Follow Us\n    <button ion-button outline item-end (click)="openFollow()">Follow</button>\n  </ion-item>   \n    \n    \n <ion-item>\n    <ion-icon name="mail" item-start></ion-icon>\n    Contact Support\n    <button ion-button outline item-end (click)="openEmail()">Email</button>\n  </ion-item>  \n    \n    <ion-list-header *ngIf="coaches.data.length > 0">\n        <h2>Active Coaches</h2>\n    </ion-list-header> \n\n    <ion-list *ngIf="coaches.data.length > 0">           \n        <ion-item *ngFor="let coach of coaches.data" (click)="viewProfile(coach)">\n            <ion-avatar item-start>\n                <img [src]="coach.avatar ? coach.avatar : \'http://websites.localhost/strengthsheet/api/uploads/profile.jpg\'">\n            </ion-avatar>\n            <h2>{{coach.name}}</h2>\n            <button ion-button clear item-end (click)="removeCoach(coach,i, $event)" color="danger">Remove</button>\n        </ion-item>  \n    </ion-list>    \n    \n    \n    <ion-list-header>\n        <h2>Account Settings</h2>\n    </ion-list-header>      \n    \n    <button ion-item detail-none (click)="openEditProfile()">\n            <ion-icon name="unlock" item-start></ion-icon>\n        Edit Profile\n        <ion-icon ios="ios-arrow-forward" md="ios-arrow-forward" item-end></ion-icon>\n    </button>  \n\n    <button ion-item detail-none (click)="openChangePassword()">\n            <ion-icon name="unlock" item-start></ion-icon>\n        Change Password\n        <ion-icon ios="ios-arrow-forward" md="ios-arrow-forward" item-end></ion-icon>\n    </button>  \n  \n\n\n    <button ion-item detail-none (click)="logout()">\n            <ion-icon name="lock" item-start></ion-icon>\n        Logout\n    </button> \n\n     \n</ion-list>    \n \n</ion-content>'/*ion-inline-end:"D:\Taylor\Documents\Websites\strengthsheet\mobile\src\pages\settings\settings.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__ionic_native_email_composer__["a" /* EmailComposer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__ionic_native_email_composer__["a" /* EmailComposer */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_3__providers_authentication_authentication__["a" /* AuthenticationProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_authentication_authentication__["a" /* AuthenticationProvider */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_3__providers_authentication_authentication__["a" /* AuthenticationProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_authentication_authentication__["a" /* AuthenticationProvider */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_4__providers_request_request__["a" /* RequestProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_request_request__["a" /* RequestProvider */]) === "function" && _l || Object])
    ], SettingsPage);
    return SettingsPage;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditProfileModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_transfer__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modals_find_address_find_address__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_settings__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_authentication_authentication__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var EditProfileModal = (function () {
    function EditProfileModal(platform, params, modalCtrl, loadingCtrl, viewCtrl, camera, storage, alertCtrl, events, transfer, authenticationProvider) {
        this.platform = platform;
        this.params = params;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.viewCtrl = viewCtrl;
        this.camera = camera;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.transfer = transfer;
        this.authenticationProvider = authenticationProvider;
        this.profile = {};
        Object.assign(this.profile, this.params.data.profile);
        this.profile.dob = this.profile.dob ? __WEBPACK_IMPORTED_MODULE_8_moment__(this.profile.dob).toISOString() : null;
        console.log(this.profile);
    }
    EditProfileModal.prototype.update = function () {
        this.viewCtrl.dismiss(this.profile);
    };
    EditProfileModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    EditProfileModal.prototype.openFindAddress = function () {
        var _this = this;
        if (this.addressOpen) {
            return;
        }
        this.addressOpen = true;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__modals_find_address_find_address__["a" /* FindAddressModal */], { location: this.profile.address });
        modal.onDidDismiss(function (address) {
            _this.addressOpen = false;
            if (address) {
                _this.profile.address = address.description;
            }
        });
        modal.present();
    };
    EditProfileModal.prototype.changeAvatar = function () {
        var _this = this;
        var cameraOptions = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            quality: 25
        };
        this.camera.getPicture(cameraOptions)
            .then(function (image) {
            var loading = _this.loadingCtrl.create({
                content: 'Your image is being uploaded. Please wait...'
            });
            loading.present();
            var fileTransfer = _this.transfer.create();
            var options = {
                fileKey: "fileToUpload",
                fileName: Math.random().toString(36).substring(2),
                params: {},
                mimeType: "image/jpeg"
            };
            fileTransfer.upload(image, encodeURI(__WEBPACK_IMPORTED_MODULE_6__app_app_settings__["a" /* AppSettings */].apiUrl + "/upload"), options).then(function (data) {
                loading.dismiss();
                _this.profile.avatar = data.response;
            }, function (err) {
                loading.dismiss();
                var alert = _this.alertCtrl.create({
                    title: "Error",
                    subTitle: "There was a problem uploading your image",
                    message: JSON.stringify(err),
                    buttons: [
                        {
                            text: 'Dismiss',
                            role: 'cancel'
                        }
                    ]
                });
                alert.present();
            });
        }, function (err) {
            //console.log(err)
        });
    };
    EditProfileModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'edit-profile',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\strengthsheet\mobile\src\modals\edit-profile\edit-profile.html"*/'<ion-header>\n    <ion-toolbar  color="primary">\n        <ion-title>\n            Edit Profile\n        </ion-title>\n        <ion-buttons start>\n\n\n            \n            <button ion-button (click)="dismiss()">\n                <span ion-text showWhen="ios">Cancel</span>\n                <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n            </button>\n        </ion-buttons>\n  \n    </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content>\n    \n    <ion-list>      \n\n        \n        <ion-item>\n            <ion-avatar item-start>\n                <img [src]="profile.avatar ? profile.avatar : \'http://websites.localhost/strengthsheet/api/uploads/profile.jpg\'">\n            </ion-avatar>\n            <button ion-button color="primary">Change Photo</button>\n        </ion-item>\n        \n        <ion-item>\n            <ion-label floating>Name</ion-label>\n            <ion-input type="text" [(ngModel)]="profile.name"></ion-input>\n        </ion-item>    \n              \n        \n        <ion-item>\n            <ion-label floating>Email</ion-label>\n            <ion-input type="email" [(ngModel)]="profile.email"></ion-input>\n        </ion-item>   \n\n        <ion-item>\n            <ion-label floating>Phone</ion-label>\n            <ion-input type="tel" [(ngModel)]="profile.phone"></ion-input>\n        </ion-item> \n        \n        <ion-item>\n            <ion-label floating>Address</ion-label>\n            <ion-input type="text" [(ngModel)]="profile.address" (ionFocus)="openFindAddress()"></ion-input>\n        </ion-item>        \n        \n        <ion-item>\n          <ion-label floating>Gender</ion-label>\n          <ion-select [(ngModel)]="profile.gender">\n            <ion-option value="Male">Male</ion-option>\n            <ion-option value="Female">Female</ion-option>\n            <ion-option value="Other">Other</ion-option>\n          </ion-select>\n        </ion-item>        \n        \n        <ion-item>\n            <ion-label floating>Date Of Birth</ion-label>\n            <ion-datetime displayFormat="DD MMM YYYY" pickerFormat="DD MMM YYYY" [(ngModel)]="profile.dob"></ion-datetime>\n        </ion-item>  \n \n\n        <ion-item>\n            <ion-label floating>Biography/About You</ion-label>\n            <ion-textarea [(ngModel)]="profile.about" autosize></ion-textarea>\n        </ion-item>\n\n        \n        \n    </ion-list>  \n        \n        \n</ion-content>\n\n\n\n<ion-footer>\n    <button ion-button full color="primary" (click)="update()">Update Profile</button>\n\n</ion-footer>'/*ion-inline-end:"D:\Taylor\Documents\Websites\strengthsheet\mobile\src\modals\edit-profile\edit-profile.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_7__providers_authentication_authentication__["a" /* AuthenticationProvider */]])
    ], EditProfileModal);
    return EditProfileModal;
}());

//# sourceMappingURL=edit-profile.js.map

/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FindAddressModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FindAddressModal = (function () {
    function FindAddressModal(platform, params, viewCtrl) {
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.address = params.data.location;
    }
    FindAddressModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    FindAddressModal.prototype.detail = function (address) {
        console.log(address);
        this.viewCtrl.dismiss(address[0]);
    };
    FindAddressModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'find-address',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\strengthsheet\mobile\src\modals\find-address\find-address.html"*/'<ion-header>\n    <ion-toolbar color="primary">\n        <ion-title>\n            Find Address\n        </ion-title>\n        <ion-buttons start>\n            <button ion-button (click)="dismiss()">\n                <span ion-text showWhen="ios">Cancel</span>\n                <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content>\n    \n    <ion-list>      \n\n        \n        <google-places-autocomplete (callback)="detail($event)" key="AIzaSyBnYKCTzKwkOjRmnyuzKNSmDopgI2yWbns" [(ngModel)]="address"></google-places-autocomplete>\n \n\n    </ion-list>  \n        \n        \n</ion-content>\n\n'/*ion-inline-end:"D:\Taylor\Documents\Websites\strengthsheet\mobile\src\modals\find-address\find-address.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */]])
    ], FindAddressModal);
    return FindAddressModal;
}());

//# sourceMappingURL=find-address.js.map

/***/ }),

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(380);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_signup_signup__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_diary_diary__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_diary_exercise_diary_exercise__ = __webpack_require__(444);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_messages_messages__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_message_message__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_settings_settings__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_tabs_tabs__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__modals_add_exercise_add_exercise__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__modals_edit_profile_edit_profile__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__modals_edit_diary_exercise_edit_diary_exercise__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__modals_notifications_notifications__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__modals_requests_requests__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__modals_profile_profile__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__modals_find_address_find_address__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_ion_datepicker__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_autosize_autosize__ = __webpack_require__(445);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_ionic2_google_places_autocomplete__ = __webpack_require__(446);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_diary_diary__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__providers_authentication_authentication__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__providers_exercise_exercise__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__providers_message_message__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__providers_request_request__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__providers_notification_notification__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ionic_native_status_bar__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ionic_native_splash_screen__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ionic_native_onesignal__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ionic_native_email_composer__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__ionic_native_camera__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__ionic_native_file_transfer__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__ionic_native_file__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__ionic_native_in_app_browser__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pipes_exercise_search__ = __webpack_require__(449);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__pipes_sort__ = __webpack_require__(450);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








































var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_diary_diary__["a" /* DiaryPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_diary_exercise_diary_exercise__["a" /* DiaryExercisePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_messages_messages__["a" /* MessagesPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_message_message__["a" /* MessagePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_13__modals_add_exercise_add_exercise__["a" /* AddExerciseModal */],
                __WEBPACK_IMPORTED_MODULE_14__modals_edit_profile_edit_profile__["a" /* EditProfileModal */],
                __WEBPACK_IMPORTED_MODULE_16__modals_notifications_notifications__["a" /* NotificationsModal */],
                __WEBPACK_IMPORTED_MODULE_17__modals_requests_requests__["a" /* RequestsModal */],
                __WEBPACK_IMPORTED_MODULE_15__modals_edit_diary_exercise_edit_diary_exercise__["a" /* EditDiaryExerciseModal */],
                __WEBPACK_IMPORTED_MODULE_19__modals_find_address_find_address__["a" /* FindAddressModal */],
                __WEBPACK_IMPORTED_MODULE_18__modals_profile_profile__["a" /* ProfileModal */],
                __WEBPACK_IMPORTED_MODULE_38__pipes_exercise_search__["a" /* ExerciseSearchPipe */],
                __WEBPACK_IMPORTED_MODULE_39__pipes_sort__["a" /* ArraySortPipe */],
                __WEBPACK_IMPORTED_MODULE_21__components_autosize_autosize__["a" /* Autosize */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_20_ion_datepicker__["b" /* DatePickerModule */],
                __WEBPACK_IMPORTED_MODULE_31__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_22_ionic2_google_places_autocomplete__["a" /* GooglePlacesAutocompleteComponentModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_diary_diary__["a" /* DiaryPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_diary_exercise_diary_exercise__["a" /* DiaryExercisePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_messages_messages__["a" /* MessagesPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_message_message__["a" /* MessagePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_13__modals_add_exercise_add_exercise__["a" /* AddExerciseModal */],
                __WEBPACK_IMPORTED_MODULE_14__modals_edit_profile_edit_profile__["a" /* EditProfileModal */],
                __WEBPACK_IMPORTED_MODULE_15__modals_edit_diary_exercise_edit_diary_exercise__["a" /* EditDiaryExerciseModal */],
                __WEBPACK_IMPORTED_MODULE_16__modals_notifications_notifications__["a" /* NotificationsModal */],
                __WEBPACK_IMPORTED_MODULE_17__modals_requests_requests__["a" /* RequestsModal */],
                __WEBPACK_IMPORTED_MODULE_19__modals_find_address_find_address__["a" /* FindAddressModal */],
                __WEBPACK_IMPORTED_MODULE_18__modals_profile_profile__["a" /* ProfileModal */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_29__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_30__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_32__ionic_native_onesignal__["a" /* OneSignal */],
                __WEBPACK_IMPORTED_MODULE_33__ionic_native_email_composer__["a" /* EmailComposer */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_23__providers_diary_diary__["a" /* DiaryProvider */],
                __WEBPACK_IMPORTED_MODULE_24__providers_authentication_authentication__["a" /* AuthenticationProvider */],
                __WEBPACK_IMPORTED_MODULE_25__providers_exercise_exercise__["a" /* ExerciseProvider */],
                __WEBPACK_IMPORTED_MODULE_26__providers_message_message__["a" /* MessageProvider */],
                __WEBPACK_IMPORTED_MODULE_27__providers_request_request__["a" /* RequestProvider */],
                __WEBPACK_IMPORTED_MODULE_28__providers_notification_notification__["a" /* NotificationProvider */],
                __WEBPACK_IMPORTED_MODULE_35__ionic_native_file_transfer__["a" /* FileTransfer */],
                __WEBPACK_IMPORTED_MODULE_36__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_34__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_37__ionic_native_in_app_browser__["a" /* InAppBrowser */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signup_signup__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_authentication_authentication__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, authProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authProvider = authProvider;
        this.user = { email: "", password: "", error: "", loading: false };
    }
    LoginPage.prototype.login = function () {
        var _this = this;
        this.user.loading = true;
        this.user.error = "";
        this.authProvider.login(this.user).then(function (token) {
            _this.authProvider.getUserData().then(function (user) {
                _this.user.loading = false;
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]);
                _this.navCtrl.popToRoot();
            }).catch(function (e) {
                _this.user.loading = false;
            });
        }).catch(function (e) {
            console.log(e);
            _this.user.loading = false;
            if (e && e.status === 401) {
                _this.user.error = "Invalid credentials";
            }
            else if (e && e.status === 422) {
                for (var _i = 0, _a = e.error.error.errors; _i < _a.length; _i++) {
                    var error = _a[_i];
                    _this.user.error = _this.user.error + error + " ";
                }
            }
            else {
                _this.user.error = e.message;
            }
        });
    };
    LoginPage.prototype.signup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__signup_signup__["a" /* SignupPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\strengthsheet\mobile\src\pages\login\login.html"*/'<ion-content>\n    \n    <div class="login-top-section">\n\n        <img class="logo" src="assets/imgs/icon-light.png" />\n\n    </div>\n\n\n\n    \n    \n    <ion-list class="login-form" ion-card>\n        <ion-card class="login-form-card">\n            <ion-card-content>\n                <ion-item>\n                    <ion-label floating>Email</ion-label>\n                    <ion-input type="text" [(ngModel)]="user.email"></ion-input>\n                </ion-item>\n\n                <ion-item>\n                    <ion-label floating>Password</ion-label>\n                    <ion-input type="password" [(ngModel)]="user.password"></ion-input>\n                </ion-item>\n            </ion-card-content>\n        </ion-card>\n        \n        <button ion-button full color=\'primary\' class="login-button" (click)="login()" [disabled]="user.loading">\n            Log In\n            <ion-spinner *ngIf="user.loading"></ion-spinner>\n        </button>\n        \n        <p class="login-error" *ngIf="user.error">{{user.error}}</p>\n         \n        <p>Don\'t have an account? <a (click)="signup()">Sign up</a></p>\n   \n        \n        \n    </ion-list>\n    \n\n</ion-content>\n\n\n'/*ion-inline-end:"D:\Taylor\Documents\Websites\strengthsheet\mobile\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_authentication_authentication__["a" /* AuthenticationProvider */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_settings__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AuthenticationProvider = (function () {
    function AuthenticationProvider(http, storage, events, app) {
        this.http = http;
        this.storage = storage;
        this.events = events;
        this.app = app;
    }
    AuthenticationProvider.prototype.login = function (data) {
        var _this = this;
        console.log(data);
        return new Promise(function (resolve, reject) {
            _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/auth/login", data).subscribe(function (res) {
                console.log(res);
                _this.storage.set("token", res["token"]).then(function () {
                    _this.events.publish("user:loggedin");
                });
                resolve(res["token"]);
            }, function (e) {
                console.log(e);
                reject(e);
            });
        });
    };
    AuthenticationProvider.prototype.register = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/auth/signup", data).subscribe(function (res) {
                _this.storage.set("token", res["token"]).then(function () {
                    _this.events.publish("user:loggedin");
                });
                resolve(res["token"]);
            }, function (e) {
                reject(e);
            });
        });
    };
    AuthenticationProvider.prototype.getUserData = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("token").then(function (token) {
                if (token) {
                    _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/user?token=" + token).subscribe(function (res) {
                        _this.storage.set("user", res["user"]);
                        _this.events.publish("user:retreived", res["user"]);
                        resolve(res["user"]);
                    }, function (e) {
                        console.log(e);
                        if (e && e.error && e.error.error && e.error.error.status_code === 401) {
                            //token expired, logout
                            _this.storage.clear();
                            _this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */]);
                            _this.app.getRootNav().popToRoot();
                        }
                        reject(e);
                    });
                }
                else {
                    reject();
                }
            });
        });
    };
    AuthenticationProvider.prototype.logout = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("token").then(function (token) {
                if (token) {
                    _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/auth/logout?token=" + token, {}).subscribe(function (res) {
                        resolve();
                    }, function (e) {
                        resolve();
                    });
                }
                else {
                    resolve();
                }
                _this.storage.clear();
            });
        });
    };
    AuthenticationProvider.prototype.savePushId = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("token").then(function (token) {
                if (token) {
                    _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/auth/updatepushid?token=" + token, { push_id: id }).subscribe(function (res) {
                        resolve();
                    }, function (e) {
                        reject(e);
                    });
                }
                else {
                    reject();
                }
            });
        });
    };
    AuthenticationProvider.prototype.changePassword = function (email, password, passwordConfirm) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("token").then(function (token) {
                if (token) {
                    _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/auth/reset?token=" + token, { email: email, password: password, password_confirmation: passwordConfirm }).subscribe(function (res) {
                        resolve();
                    }, function (e) {
                        reject(e);
                    });
                }
                else {
                    reject();
                }
            });
        });
    };
    AuthenticationProvider.prototype.getProfile = function (userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("token").then(function (token) {
                if (token) {
                    _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + '/profiles/' + userId + '?token=' + token).subscribe(function (res) {
                        resolve(res.profile);
                    }, function (e) {
                        reject(e);
                    });
                }
                else {
                    reject();
                }
            });
        });
    };
    AuthenticationProvider.prototype.updateProfile = function (profile) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("token").then(function (token) {
                if (token) {
                    _this.http.put(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/profiles/" + profile.id + "?token=" + token, profile).subscribe(function (res) {
                        resolve(res);
                    }, function (e) {
                        reject(e);
                    });
                }
                else {
                    reject();
                }
            });
        });
    };
    AuthenticationProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Events */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* App */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* App */]) === "function" && _d || Object])
    ], AuthenticationProvider);
    return AuthenticationProvider;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=authentication.js.map

/***/ }),

/***/ 421:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_diary_diary__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_message_message__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modals_requests_requests__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_authentication_authentication__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_notification_notification__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_onesignal__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_storage__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var MyApp = (function () {
    function MyApp(platform, app, statusBar, splashScreen, authProvider, storage, oneSignal, events, notificationProvider, modalCtrl) {
        var _this = this;
        this.platform = platform;
        this.app = app;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.authProvider = authProvider;
        this.storage = storage;
        this.oneSignal = oneSignal;
        this.events = events;
        this.notificationProvider = notificationProvider;
        this.modalCtrl = modalCtrl;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        this.initializeApp();
        this.user = { profile: {} };
        this.storage.get("user").then(function (user) {
            console.log(user);
            if (user) {
                _this.user = user;
                _this.savePushId();
                _this.authProvider.getUserData();
            }
            else {
                _this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */]);
                _this.app.getRootNav().popToRoot();
            }
            setTimeout(function () { _this.splashScreen.hide(); }, 500);
        }).catch(function () {
            _this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */]);
            _this.app.getRootNav().popToRoot();
            _this.splashScreen.hide();
        });
        this.events.subscribe("user:loggedin", function () {
            _this.savePushId();
        });
    }
    MyApp.prototype.savePushId = function () {
        var _this = this;
        this.oneSignal.getIds().then(function (data) {
            if (data.userId) {
                //save
                _this.authProvider.savePushId(data.userId);
            }
        }).catch(function (e) {
            //console.log(e);
        });
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            if (_this.platform.is("android")) {
                _this.statusBar.backgroundColorByHexString("#173e19");
                _this.statusBar.styleLightContent();
            }
            else {
                _this.statusBar.styleLightContent();
            }
            if (_this.platform.is('cordova')) {
                _this.oneSignal.startInit("2afedd0c-2e15-421f-8408-89d5975e2957", "623915044954");
                _this.oneSignal.handleNotificationReceived().subscribe(function (data) {
                    data.payload.additionalData["title"] = data.payload.title;
                    var pushData = data.payload.additionalData;
                    _this.events.publish("notification:received", pushData);
                    if (pushData.type === "diary") {
                        var workoutDate = pushData.id.split(":")[1];
                        _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_6__pages_diary_diary__["a" /* DiaryPage */], { date: workoutDate });
                    }
                    else if (pushData.type === "message") {
                        _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_7__pages_message_message__["a" /* MessagePage */], { conversation: { id: pushData.id } });
                    }
                    else if (pushData.type === "request") {
                        var modal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__modals_requests_requests__["a" /* RequestsModal */]);
                        modal.present();
                    }
                });
                _this.oneSignal.handleNotificationOpened().subscribe(function (data) {
                    if (!data.notification.isAppInFocus) {
                        var pushData = data.notification.payload.additionalData;
                        if (pushData.type === "diary") {
                            var workoutDate = pushData.id.split(":")[1];
                            _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_6__pages_diary_diary__["a" /* DiaryPage */], { date: workoutDate });
                        }
                        else if (pushData.type === "message") {
                            _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_7__pages_message_message__["a" /* MessagePage */], { conversation: { id: pushData.id } });
                        }
                        else if (pushData.type === "request") {
                            var modal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__modals_requests_requests__["a" /* RequestsModal */]);
                            modal.present();
                        }
                        _this.notificationProvider.updateNotification({ seen: true, id: pushData.notification_id }).then(function () {
                            _this.events.publish("notification:viewed");
                        });
                        console.log(pushData);
                    }
                });
                _this.oneSignal.endInit();
            }
        });
    };
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"D:\Taylor\Documents\Websites\strengthsheet\mobile\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"D:\Taylor\Documents\Websites\strengthsheet\mobile\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_9__providers_authentication_authentication__["a" /* AuthenticationProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__providers_authentication_authentication__["a" /* AuthenticationProvider */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_12__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_12__ionic_storage__["b" /* Storage */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_11__ionic_native_onesignal__["a" /* OneSignal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11__ionic_native_onesignal__["a" /* OneSignal */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_10__providers_notification_notification__["a" /* NotificationProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__providers_notification_notification__["a" /* NotificationProvider */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */]) === "function" && _k || Object])
    ], MyApp);
    return MyApp;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 434:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 213,
	"./af.js": 213,
	"./ar": 214,
	"./ar-dz": 215,
	"./ar-dz.js": 215,
	"./ar-kw": 216,
	"./ar-kw.js": 216,
	"./ar-ly": 217,
	"./ar-ly.js": 217,
	"./ar-ma": 218,
	"./ar-ma.js": 218,
	"./ar-sa": 219,
	"./ar-sa.js": 219,
	"./ar-tn": 220,
	"./ar-tn.js": 220,
	"./ar.js": 214,
	"./az": 221,
	"./az.js": 221,
	"./be": 222,
	"./be.js": 222,
	"./bg": 223,
	"./bg.js": 223,
	"./bm": 224,
	"./bm.js": 224,
	"./bn": 225,
	"./bn.js": 225,
	"./bo": 226,
	"./bo.js": 226,
	"./br": 227,
	"./br.js": 227,
	"./bs": 228,
	"./bs.js": 228,
	"./ca": 229,
	"./ca.js": 229,
	"./cs": 230,
	"./cs.js": 230,
	"./cv": 231,
	"./cv.js": 231,
	"./cy": 232,
	"./cy.js": 232,
	"./da": 233,
	"./da.js": 233,
	"./de": 234,
	"./de-at": 235,
	"./de-at.js": 235,
	"./de-ch": 236,
	"./de-ch.js": 236,
	"./de.js": 234,
	"./dv": 237,
	"./dv.js": 237,
	"./el": 238,
	"./el.js": 238,
	"./en-au": 239,
	"./en-au.js": 239,
	"./en-ca": 240,
	"./en-ca.js": 240,
	"./en-gb": 241,
	"./en-gb.js": 241,
	"./en-ie": 242,
	"./en-ie.js": 242,
	"./en-il": 243,
	"./en-il.js": 243,
	"./en-nz": 244,
	"./en-nz.js": 244,
	"./eo": 245,
	"./eo.js": 245,
	"./es": 246,
	"./es-do": 247,
	"./es-do.js": 247,
	"./es-us": 248,
	"./es-us.js": 248,
	"./es.js": 246,
	"./et": 249,
	"./et.js": 249,
	"./eu": 250,
	"./eu.js": 250,
	"./fa": 251,
	"./fa.js": 251,
	"./fi": 252,
	"./fi.js": 252,
	"./fo": 253,
	"./fo.js": 253,
	"./fr": 254,
	"./fr-ca": 255,
	"./fr-ca.js": 255,
	"./fr-ch": 256,
	"./fr-ch.js": 256,
	"./fr.js": 254,
	"./fy": 257,
	"./fy.js": 257,
	"./gd": 258,
	"./gd.js": 258,
	"./gl": 259,
	"./gl.js": 259,
	"./gom-latn": 260,
	"./gom-latn.js": 260,
	"./gu": 261,
	"./gu.js": 261,
	"./he": 262,
	"./he.js": 262,
	"./hi": 263,
	"./hi.js": 263,
	"./hr": 264,
	"./hr.js": 264,
	"./hu": 265,
	"./hu.js": 265,
	"./hy-am": 266,
	"./hy-am.js": 266,
	"./id": 267,
	"./id.js": 267,
	"./is": 268,
	"./is.js": 268,
	"./it": 269,
	"./it.js": 269,
	"./ja": 270,
	"./ja.js": 270,
	"./jv": 271,
	"./jv.js": 271,
	"./ka": 272,
	"./ka.js": 272,
	"./kk": 273,
	"./kk.js": 273,
	"./km": 274,
	"./km.js": 274,
	"./kn": 275,
	"./kn.js": 275,
	"./ko": 276,
	"./ko.js": 276,
	"./ky": 277,
	"./ky.js": 277,
	"./lb": 278,
	"./lb.js": 278,
	"./lo": 279,
	"./lo.js": 279,
	"./lt": 280,
	"./lt.js": 280,
	"./lv": 281,
	"./lv.js": 281,
	"./me": 282,
	"./me.js": 282,
	"./mi": 283,
	"./mi.js": 283,
	"./mk": 284,
	"./mk.js": 284,
	"./ml": 285,
	"./ml.js": 285,
	"./mn": 286,
	"./mn.js": 286,
	"./mr": 287,
	"./mr.js": 287,
	"./ms": 288,
	"./ms-my": 289,
	"./ms-my.js": 289,
	"./ms.js": 288,
	"./mt": 290,
	"./mt.js": 290,
	"./my": 291,
	"./my.js": 291,
	"./nb": 292,
	"./nb.js": 292,
	"./ne": 293,
	"./ne.js": 293,
	"./nl": 294,
	"./nl-be": 295,
	"./nl-be.js": 295,
	"./nl.js": 294,
	"./nn": 296,
	"./nn.js": 296,
	"./pa-in": 297,
	"./pa-in.js": 297,
	"./pl": 298,
	"./pl.js": 298,
	"./pt": 299,
	"./pt-br": 300,
	"./pt-br.js": 300,
	"./pt.js": 299,
	"./ro": 301,
	"./ro.js": 301,
	"./ru": 302,
	"./ru.js": 302,
	"./sd": 303,
	"./sd.js": 303,
	"./se": 304,
	"./se.js": 304,
	"./si": 305,
	"./si.js": 305,
	"./sk": 306,
	"./sk.js": 306,
	"./sl": 307,
	"./sl.js": 307,
	"./sq": 308,
	"./sq.js": 308,
	"./sr": 309,
	"./sr-cyrl": 310,
	"./sr-cyrl.js": 310,
	"./sr.js": 309,
	"./ss": 311,
	"./ss.js": 311,
	"./sv": 312,
	"./sv.js": 312,
	"./sw": 313,
	"./sw.js": 313,
	"./ta": 314,
	"./ta.js": 314,
	"./te": 315,
	"./te.js": 315,
	"./tet": 316,
	"./tet.js": 316,
	"./tg": 317,
	"./tg.js": 317,
	"./th": 318,
	"./th.js": 318,
	"./tl-ph": 319,
	"./tl-ph.js": 319,
	"./tlh": 320,
	"./tlh.js": 320,
	"./tr": 321,
	"./tr.js": 321,
	"./tzl": 322,
	"./tzl.js": 322,
	"./tzm": 323,
	"./tzm-latn": 324,
	"./tzm-latn.js": 324,
	"./tzm.js": 323,
	"./ug-cn": 325,
	"./ug-cn.js": 325,
	"./uk": 326,
	"./uk.js": 326,
	"./ur": 327,
	"./ur.js": 327,
	"./uz": 328,
	"./uz-latn": 329,
	"./uz-latn.js": 329,
	"./uz.js": 328,
	"./vi": 330,
	"./vi.js": 330,
	"./x-pseudo": 331,
	"./x-pseudo.js": 331,
	"./yo": 332,
	"./yo.js": 332,
	"./zh-cn": 333,
	"./zh-cn.js": 333,
	"./zh-hk": 334,
	"./zh-hk.js": 334,
	"./zh-tw": 335,
	"./zh-tw.js": 335
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 434;

/***/ }),

/***/ 444:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DiaryExercisePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DiaryExercisePage = (function () {
    function DiaryExercisePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    DiaryExercisePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-diary-exercise',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\strengthsheet\mobile\src\pages\diary-exercise\diary-exercise.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Home</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h2>Welcome to Ionic!</h2>\n  <p>\n    This starter project comes with simple tabs-based layout for apps\n    that are going to primarily use a Tabbed UI.\n  </p>\n  <p>\n    Take a look at the <code>src/pages/</code> directory to add or change tabs,\n    update any existing page or create new pages.\n  </p>\n</ion-content>\n'/*ion-inline-end:"D:\Taylor\Documents\Websites\strengthsheet\mobile\src\pages\diary-exercise\diary-exercise.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
    ], DiaryExercisePage);
    return DiaryExercisePage;
}());

//# sourceMappingURL=diary-exercise.js.map

/***/ }),

/***/ 445:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Autosize; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Autosize = (function () {
    function Autosize(element) {
        this.element = element;
    }
    Autosize.prototype.onInput = function (textArea) {
        this.adjust();
    };
    Autosize.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () { return _this.adjust(); }, 0);
    };
    Autosize.prototype.adjust = function () {
        var textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
        textArea.style.overflow = 'hidden';
        textArea.style.height = 'auto';
        textArea.style.height = textArea.scrollHeight + "px";
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* HostListener */])('input', ['$event.target']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [HTMLTextAreaElement]),
        __metadata("design:returntype", void 0)
    ], Autosize.prototype, "onInput", null);
    Autosize = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* Directive */])({
            selector: 'ion-textarea[autosize]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]])
    ], Autosize);
    return Autosize;
}());

//# sourceMappingURL=autosize.js.map

/***/ }),

/***/ 449:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExerciseSearchPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ExerciseSearchPipe = (function () {
    function ExerciseSearchPipe() {
    }
    ExerciseSearchPipe.prototype.transform = function (items, term) {
        var returnItems = items.filter(function (item) { return item.name.toLowerCase().indexOf(term.toLowerCase()) !== -1; });
        return returnItems;
    };
    ExerciseSearchPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Pipe */])({
            name: 'exerciseSearch'
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])()
    ], ExerciseSearchPipe);
    return ExerciseSearchPipe;
}());

//# sourceMappingURL=exercise-search.js.map

/***/ }),

/***/ 450:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArraySortPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ArraySortPipe = (function () {
    function ArraySortPipe() {
    }
    ArraySortPipe.prototype.transform = function (array, field) {
        array.sort(function (a, b) {
            if (field === "id") {
                a = parseInt(a[field]);
                b = parseInt(b[field]);
            }
            else {
                a = a[field].toLowerCase();
                b = b[field].toLowerCase();
            }
            if (a < b) {
                return -1;
            }
            else if (a > b) {
                return 1;
            }
            else {
                return 0;
            }
        });
        return array;
    };
    ArraySortPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Pipe */])({
            name: "sort"
        })
    ], ArraySortPipe);
    return ArraySortPipe;
}());

//# sourceMappingURL=sort.js.map

/***/ }),

/***/ 451:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_settings__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var NotificationProvider = (function () {
    function NotificationProvider(http, storage, events, app) {
        this.http = http;
        this.storage = storage;
        this.events = events;
        this.app = app;
    }
    NotificationProvider.prototype.getNotifications = function (pagination) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("token").then(function (token) {
                if (token) {
                    _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/notifications?token=" + token + "&page=" + pagination.page + "&limit=" + pagination.limit).subscribe(function (res) {
                        console.log(res);
                        resolve(res);
                    }, function (e) {
                        reject(e);
                    });
                }
                else {
                    reject();
                }
            });
        });
    };
    NotificationProvider.prototype.getNotificationCount = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("token").then(function (token) {
                if (token) {
                    _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/notificationcount?token=" + token).subscribe(function (res) {
                        console.log(res);
                        resolve(res);
                    }, function (e) {
                        reject(e);
                    });
                }
                else {
                    reject();
                }
            });
        });
    };
    NotificationProvider.prototype.updateNotification = function (notification) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("token").then(function (token) {
                if (token) {
                    _this.http.put(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/notifications/" + notification.id + "?token=" + token, notification).subscribe(function (res) {
                        resolve(res);
                    }, function (e) {
                        reject(e);
                    });
                }
                else {
                    reject();
                }
            });
        });
    };
    NotificationProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Events */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* App */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* App */]) === "function" && _d || Object])
    ], NotificationProvider);
    return NotificationProvider;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=notification.js.map

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_settings__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var RequestProvider = (function () {
    function RequestProvider(http, storage, events, app) {
        this.http = http;
        this.storage = storage;
        this.events = events;
        this.app = app;
    }
    RequestProvider.prototype.getCoaches = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("token").then(function (token) {
                if (token) {
                    _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/coaches?token=" + token).subscribe(function (res) {
                        resolve(res);
                    }, function (e) {
                        reject(e);
                    });
                }
                else {
                    reject();
                }
            });
        });
    };
    RequestProvider.prototype.getRequests = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("token").then(function (token) {
                if (token) {
                    _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/requests?token=" + token).subscribe(function (res) {
                        console.log(res.clients);
                        resolve(res.clients);
                    }, function (e) {
                        reject(e);
                    });
                }
                else {
                    reject();
                }
            });
        });
    };
    RequestProvider.prototype.acceptRequest = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("token").then(function (token) {
                if (token) {
                    _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/requests/accept?token=" + token, { id: id }).subscribe(function (res) {
                        resolve(res);
                    }, function (e) {
                        reject(e);
                    });
                }
                else {
                    reject();
                }
            });
        });
    };
    RequestProvider.prototype.declineRequest = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("token").then(function (token) {
                if (token) {
                    _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/requests/reject?token=" + token, { id: id }).subscribe(function (res) {
                        resolve(res);
                    }, function (e) {
                        reject(e);
                    });
                }
                else {
                    reject();
                }
            });
        });
    };
    RequestProvider.prototype.deleteCoach = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("token").then(function (token) {
                if (token) {
                    _this.http.delete(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/coaches/" + id + "?token=" + token).subscribe(function (res) {
                        resolve(res);
                    }, function (e) {
                        reject(e);
                    });
                }
                else {
                    reject();
                }
            });
        });
    };
    RequestProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* App */]])
    ], RequestProvider);
    return RequestProvider;
}());

//# sourceMappingURL=request.js.map

/***/ })

},[358]);
//# sourceMappingURL=main.js.map