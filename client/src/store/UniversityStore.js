import {makeAutoObservable} from "mobx";

export default class UniversityStore {
    constructor() {
        this._countries = []
        this._directions = []
        this._subjects = []
        this._languages = []
        this._universities = []
        this._selectedDirections = {}
        this._selectedSubjects  = {}
        this._selectedLanguages  = {}
        this._selectedCountries  = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 3
        this._sortBy = 'rating'
        this._sortOrder = 'desc'
        makeAutoObservable(this)
    }

    setSortBy(sortBy) {
        this._sortBy = sortBy;
    }
    setCountries(countries) {
        this._countries = countries;
    }
    setLanguages(languages) {
        this._languages = languages;
    }
    setDirections(directions) {
        this._directions = directions;
    }
    setSubjects(subjects) {
        this._subjects = subjects;
    }
    setUniversities(universities) {
        this._universities = universities;
    }

    setSelectedDirection(direction) {
        this.setPage(1);
        this._selectedDirections = direction;
    }
    setSelectedSubject(subject) {
        this.setPage(1);
        this._selectedSubjects = subject;
    }
    setSelectedCountry(country) {
        this.setPage(1);
        this._selectedCountries = country;
    }
    setPage(page) {
        this._page = page;
    }
    setTotalCount(count) {
        this._totalCount = count;
    }

    setSortOrder(order) {
        this._sortOrder = order;
    }

    get sortOrder() {
        return this._sortOrder;
    }

    get sortBy() {
        return this._sortBy;
    }
    get countries() {
        return this._countries;
    }
    get languages() {
        return this._languages;
    }
    get directions() {
        return this._directions;
    }
    get subjects() {
        return this._subjects;
    }
    get universities() {
        console.log(this._universities);
        return this._universities;
    }
    get selectedDirections() {
        return this._selectedDirections;
    }
    get selectedSubjects() {
        return this._selectedSubjects;
    }
    get selectedCountries() {
        return this._selectedCountries;
    }
    get totalCount() {
        return this._totalCount;
    }
    get page() {
        return this._page;
    }
    get limit() {
        return this._limit;
    }
}