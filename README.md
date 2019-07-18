# Upbound - Front End Coding Challenge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.0.

Challenge completed by Miranda Hoover (miranda.webd@gmail.com) July 17, 2019

**Read Me Content:**
- About
  - Viewing the site
- Site Overview
  - Features
  - Test Data
  - Additional Features
  - Filler Values
  - Disabled Features
  - Incomplete Features
  - Known Issues
- Command Line
  - Development Server
  - API Server / Backend
  - Code scaffolding
  - Build
  - Running unit test
  - Running end-to-end tests
  - Further help

---

## About:

This site was created as a test of coding ability (Angular, JavaScript, CSS, and HTML). Some of the features include Accessing an API, displaying a list of data, changing the state of some data, and filter the data. For more information on what is included in this site, see Site Overview below.

#### Viewing the site

- Dev site with test data (no API): Run `ng serve` then navigate to `http://localhost:4200/`
- Production build with data (API): Run `ng build --prod` and `node serve` then navigate to `http://localhost:3000/`

---

## Site Overview:

### Main Features

- **API**: card and campaign data can be accessed from a JSON file via an API. The API and data are included within the directory 'backend' at the root of this project (./backend).
- **Edit State**: a card's currentWorkflow value can be updated/edited by clicking various links within each card.
- **Filter By Campaign**: the cards can be filtered by their campaign value.
- **Mock Delay**: All responses from the card API are delayed by 5 seconds within card-manager.service.ts, and a loading icon is displayed. *The delay value is set by the variable updateResDelayTime within this file.*
- **Responsive design**: Header style changes for small or large device, and the number of cards in a row ranges from 1 to 5 based on the device/window size.

### Test Data

Test data is available when the API server is not running and the site is viewed in dev mode. **Note:** This does not refer to the mock data accessed via the API but JSON data set in the card manager service (card-manager.service.ts).

### Additional Features
*Features not specified in the challenge, but I wanted to attempt.*
- **Filter by workflow**: The dropdown for filtering the cards my workflow is functional.
- **Lazy loaded images**: Card images are loaded by the browser as they come into view (using ng-lazyload-image)
- **Icon Sprite**: Icons are created using an SVG sprite and the the IconComponent (icon.component.ts).
- **Skip to main content link**: A hidden skip link displays when in tabbed into focus, jumps the focus to the start of the service card list.
- **Truncation pipe**: large numbers can be truncated with a suffix to represent its true size (e.g. 100000 -> 100K)
- **Loop through dates**: Click the arrows to change which date is displayed in the header. This filter is not connected to any filtering logic and does not currently filter cards.

### Filler Values
*Values that do not come directly from card values.*
- Monthly dollar value of all cards is set to 5000 to match mockup image. Value is set in card-status.component.ts.
- The progress bar is set to 0% unless the card's current workflow is 'active,' then it is set to 100%.

### Disabled Features
*Features with complete logic, but have been disabled/commented out.*
- **Search bar**, filter cards by title. This feature is complete and functional, but there were several visual design issues (such as header space) that need to be fixed. Since this was not a required features, these issues are considered low priority and have been put on hold. Functional search bar has been disabled by setting the input property allowInlineSearchBar to false in the parent component (header.component.html) for both small and large displays.
- **Filter card display with CSS**: Use CSS to hide the cards filtered from display. This was an attempt to keep browsers (such as Safari) from loading an image multiple times when a card is displayed again after filtering. This has been disabled because the logic requires all unique identifiers in the mock data to function accordingly.

### Incomplete Features
*This is in reference to apparent features that appear to the user, but won't have any actual effect because the logic is incomplete or does not exist.*
- Filtering cards by date
- Create new card
- Edit all card values
- Share Card
- Delete Card

### Known Issues

- The trackBy function for the list of cards uses index plus currentWorkflow (instead of the intended id plus currentWorkflow). This means some of the cards may be needlessly rebuilt when the position of card in the list is changed (e.g. filtering, changing currentWorkflow). This change was made to prevent icons from disappearing when cards were rebuilt (Chrome, prod mode).

---

## Command Line:

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### API Server / Backend

Run `node server` to access the data via the API.
Navigate to `http://localhost:3000/`

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build. (localhost:3000)

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
