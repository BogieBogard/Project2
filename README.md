# DevTinder

Team Members: Juan Varon, Patrick Wang, Ricardo Bentin, Spencer Callaway

Target Audience: bootcamp students, bootcamp grads, junior Developers, and any developer looking to gain experience while making money and an impact at the same time.

Minimum Viable Product: 
  * Able to register as a developer and / or customer
  * Customer able to:
    * Create a new project
    * Assign new project to developer that gets matched
    * Review current projects
    * Complete projects
  * Developer able to:
    * Review new project matches
    * Review current projects
  * Platform able to match a developer to a new project based on how closely the expertise required on the project matches with the expertise given by the developer during sign up
  * Create Mysql database to store project, customer, and developer data
  * Leverage sequelize ORM and MVC
  * Front-end with sign-up, profile, and project views via handlebars
  * Authentication via passport, bcrypt, and Jason Web Token
  * Notifications via toastr
  * NPM packages used:
    * bCrypt
    * Body-Parser
    * Cookie-Parser
    * Express
    * Express-Handlebars
    * JasonWebToken
    * Mysql
    * Mysql2
    * Passport
    * Sequelize
    * Toastr

Access to application:
* https://devtindergroup1.herokuapp.com OR
* Run locally: make sure to run NPM - install and be sure to setup your local database by first creating the schema from the DB folder and updating you credentials for the development object in config.json. Once you have initiated the app, sequelize will create the tables based on the models and you can populate data using the seeds file for each table.

Dev Tinder Demo:

<img src="https://github.com/DevTinder/Project2/blob/master/public/assets/img/demo.gif" alt="Customer Flow">

Full Project Idea: 

Platform to connect customers who need dev support on a project to developers who can work on their projects based on their expertise to gain experience to get closer to their dream jobs or make some extra money on the side

Features:
* Personas:
  * Developer
    * Sign Up and Create Profile
      * Enter in Name, Location and Upload Photo OR enter Github Alias and we will pull github Name, Location, and Photo into profile
      * Answer questionairre on development expertise
      * Link to developer portfolio
    * Profile View
      * Sign-in
      * View new project matches
        * Developer has right to refuse a project match if the budget or timeline do not meet their needs
        * Only once the developer has accepted a project can they reach out to the customer directly
      * Ratings and reviews from past customers
      * Projects
    * Project View
      * View list of currently assigned projects:
        * Each project view will contain:
          * Project name
          * Task list (remaining and completed)
            * Once all tasks are completed, the project is closed
          * % of project complete
          * Customer contact information
          * Due date
          * Amount to be earned upon successful completion
        
   * Customer (Project Owner)
      * Sign Up and Create Profile
        * Enter in Name, Location and Upload Photo can be of an individual or a business
      * Profile View
        * Sign-in
        * Ratings and reviews from past developers
        * Favorite developers
          * Developers that this customer has worked with in the past that he can directly assign work to
      * Project View
        * New Projects
        * Current Projects
          * Display a list of current projects that are assigned to a developer
          * Each project view will contain:
            * Project name
            * Task list (remaining and completed)
              * Once all tasks are completed, the project is closed
            * % of project complete
            * Developer contact information
            * Due date
            * Amount to be paid upon successful completion
        * New Project
          * Customer will enter in the following information:
            * Project Name
            * Expertise required (think of radio buttons with languages for them to check off)
            * Task List (what does the developer need to accomplish to complete the project)
            * Due Date
            * Budget
            * On submit, modal window pops up with a list of matched developers. Customer chooses one developer to assign work to and this project will now be moved to the current projects view. This new project will now appear in the assigned developers' new project matches section
              * Nice to have: scrape hackerrank, stackOverflow or any other dev community account to get an outsider's perspective on the dev to present to the customer before they make a selection on a developer for their projected
              * Only once a project is assigned and accepted by a developer can communication be established between the two parties
* Project to developer match logic is based on how closely the expertise required on the project matches with the expertise given by the developer during sign up
* HTML pages
  * Sign-Up
  * Profile View
  * Project View
  * New Project View w/ modal window to show developer matches to project
* MySQL/Jaws DB database with more thank likely 3 tables (Customer, Developer, Project)
* Utilizes Sequelize ORM and its MVC structure
* Deployed via Heroku
* Node application running on Express server




           
