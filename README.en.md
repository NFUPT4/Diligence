# Diligence - Employee Attendance Management System

## Introduction

"Diligence" is a lightweight, intelligent web-based attendance management system designed to address common issues in traditional attendance methods such as data fragmentation, time-consuming statistics, weak anti-cheating mechanisms, and inflexibility to adapt to flexible working hours. The system supports GPS-based location verification for clock-in, flexible attendance rule configuration, automated report generation, and leave approval workflows, enabling enterprises to digitize the entire attendance management process.

## Key Features

- **Employee Information Management**: CRUD operations for departments, positions, and employees.
- **Attendance Rule Configuration**: Support for fixed shifts and flexible working hours.
- **Smart Clock-in**: GPS-based location verification with anti-cheating (restricted clock-in outside predefined area).
- **Statistical Reports**: Automatic generation of multi-dimensional attendance reports with visual charts (e.g., ECharts).
- **Leave Approval**: Employees submit requests online, supervisors approve, and results automatically affect attendance statistics.

## Tech Stack

- **Frontend**: Vue.js (Composition API) + Element Plus + ECharts + AMap JS API
- **Backend**: Spring Boot + Spring MVC + JPA / MyBatis
- **Database**: MySQL
- **Third-party Services**: AMap Geocoding API
- **Version Control**: Git (Gitee / GitHub)


## Getting Started

### Frontend

#### Development Environment

##### Install Node.js

1. Go to [Node.js official website](https://nodejs.org/en) > Click `Get Node.js` > Click `Windows Installer (.msi)` > Run the installer > Complete the installation.

2. Open Command Prompt and run `node -v` to verify the installation.  
   If a version number appears, the installation is successful. If not, you may need to configure environment variables: `Right-click My Computer` > `Properties` > `Advanced system settings` > `Environment Variables` > `System variables` > `Path` > `Edit` > `New`, and add the `bin` directory of Node.js.

3. In Command Prompt, run `npm -v` to verify npm installation.  
   A version number indicates success.

##### Install pnpm

1. In Command Prompt, run `npm install -g pnpm` to install pnpm globally.

2. For cloning the project, refer to [Project Wiki - Git Usage Guide](https://gitee.com/nfupt4/Diligence/wikis/git%E4%BD%BF%E7%94%A8%E5%8F%82%E8%80%83) (Chinese).

3. **Navigate to the project root directory** and run `pnpm install` to install dependencies.

##### Start the Project

1. **In the project root directory**, run `pnpm run dev` to start the development server.

2. The browser should open automatically at `http://localhost:7265`. If not, manually visit the address.

### Backend

Documentation to be supplemented...

## License

This project is a course training project, licensed under CC BY-NC-SA, and is for learning and communication purposes only.