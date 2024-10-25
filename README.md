<p align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="20%" alt="COCO-SHORT-LINK-FRONTEND-VIEW-logo">
</p>
<p align="center">
    <h1 align="center">COCO-SHORT-LINK-FRONTEND-VIEW</h1>
</p>
<p align="center">
    <em>Empower Your Links with Coco: Unleash the Potential!</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/coco40725/coco-short-link-frontend-view?style=default&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/coco40725/coco-short-link-frontend-view?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/coco40725/coco-short-link-frontend-view?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/coco40725/coco-short-link-frontend-view?style=default&color=0080ff" alt="repo-language-count">
</p>
<p align="center">
	<!-- default option, no dependency badges. -->
</p>
<br>

##  Table of Contents

- [ Overview](#-overview)
- [ Features](#-features)
- [ Project Structure](#-project-structure)
  - [ Project Index](#-project-index)
- [ Getting Started](#-getting-started)
  - [ Prerequisites](#-prerequisites)
  - [ Installation](#-installation)
  - [ Usage](#-usage)
  - [ Testing](#-testing)
- [ Project Roadmap](#-project-roadmap)
- [ Contributing](#-contributing)
- [ License](#-license)
- [ Acknowledgments](#-acknowledgments)

---

##  Overview

The `coco-short-link-frontend-view` project is a dynamic and versatile software solution designed to streamline the process of creating and managing shortened links. With a focus on simplicity and efficiency, this project offers users a convenient way to generate concise URLs for sharing and tracking purposes. By leveraging a combination of cutting-edge technologies and robust functionalities, this frontend view caters to a diverse audience seeking to enhance their link management experience. Whether you're a social media enthusiast looking to optimize your sharing strategy or a business professional aiming to track marketing campaigns effectively, this project provides a valuable toolset to meet your needs. Through its intuitive interface and seamless integration capabilities, the `coco-short-link-frontend-view` project empowers users to enhance their online presence and drive meaningful engagement with their target audience.

---

##  Features

|      | Feature         | Summary       |
| :--- | :---:           | :---          |
| ⚙️  | **Architecture**  | <ul><li>Vue.js frontend architecture</li><li>Uses TypeScript for type safety</li><li>Utilizes Vue Router for routing</li></ul> |
| 🔩 | **Code Quality**  | <ul><li>Consistent coding standards</li><li>Well-structured codebase</li><li>Follows best practices for Vue.js development</li></ul> |
| 📄 | **Documentation** | <ul><li>Extensive TypeScript documentation</li><li>Includes setup guides and usage instructions</li><li>API base URLs and Google Client ID configuration details</li></ul> |
| 🔌 | **Integrations**  | <ul><li>Integration with Google Cloud Storage</li><li>Utilizes various Vue.js plugins for enhanced functionality</li><li>Includes integration with JWT decoding library</li></ul> |
| 🧩 | **Modularity**    | <ul><li>Modular Vue components for reusability</li><li>Separation of concerns in code structure</li><li>Encourages component-based development</li></ul> |
| 🧪 | **Testing**       | <ul><li>Includes unit tests using Vue Test Utils</li><li>Test coverage with V8 coverage tool</li><li>Testing utilities for Pinia state management</li></ul> |
| ⚡️  | **Performance**   | <ul><li>Optimized performance with Vue.js best practices</li><li>Efficient rendering of components</li><li>Utilizes lazy loading for improved speed</li></ul> |
| 🛡️ | **Security**      | <ul><li>Secure handling of environment variables</li><li>Utilizes JWT decoding for secure authentication</li><li>Follows security best practices for frontend development</li></ul> |
| 📦 | **Dependencies**  | <ul><li>Uses npm for package management</li><li>Includes a wide range of dependencies for various functionalities</li><li>Specifies exact versions for consistent builds</li></ul> |

---

##  Project Structure

```sh
└── coco-short-link-frontend-view/
    ├── .github
    │   └── workflows
    ├── README.md
    ├── env.readMe.txt
    ├── gulpfile.mjs
    ├── index.html
    ├── jsconfig.json
    ├── package-lock.json
    ├── package.json
    ├── public
    │   └── favicon.ico
    ├── src
    │   ├── App.vue
    │   ├── application
    │   ├── assets
    │   ├── domain
    │   ├── infra
    │   ├── main.ts
    │   ├── tests
    │   └── view
    └── vite.config.js
```


###  Project Index
<details open>
	<summary><b><code>COCO-SHORT-LINK-FRONTEND-VIEW/</code></b></summary>
	<details> <!-- __root__ Submodule -->
		<summary><b>__root__</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/env.readMe.txt'>env.readMe.txt</a></b></td>
				<td>Define environment variables for API base URLs and Google Client ID in the project configuration.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/package-lock.json'>package-lock.json</a></b></td>
				<td>- The `package-lock.json` file in the project serves as a crucial component for managing dependencies and ensuring consistent builds across the codebase architecture<br>- It plays a vital role in specifying the exact versions of packages required for the `coco-short-link-frontend-view` project, facilitating seamless integration and reliable deployment of the frontend view.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/vite.config.js'>vite.config.js</a></b></td>
				<td>Defines Vite configuration for Vue project, setting up plugins, public path, aliases, and build options.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/gulpfile.mjs'>gulpfile.mjs</a></b></td>
				<td>- Facilitates image optimization and deployment to Google Cloud Storage<br>- Cleans GCS bucket, finds all files for upload, and uploads them with metadata<br>- Tasks include minifying images, uploading to GCS for testing or production, and deploying to respective environments.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/jsconfig.json'>jsconfig.json</a></b></td>
				<td>Configure project settings for Vite and TypeScript to enable ES2022 module and target, Node module resolution, and path aliases for src directory.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/package.json'>package.json</a></b></td>
				<td>- Manages project dependencies and scripts for building, testing, and deploying the frontend view<br>- Key functionalities include building for different environments, running tests, and generating code coverage reports<br>- Dependencies range from Vue libraries to testing tools like Jest and Vite.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/index.html'>index.html</a></b></td>
				<td>Defines the main HTML structure for the project, setting up the initial layout and loading the main TypeScript file.</td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- src Submodule -->
		<summary><b>src</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/App.vue'>App.vue</a></b></td>
				<td>- Integrates various command and query handlers for user actions, such as login, logout, and link management, within the Vue.js application<br>- This file connects user interaction with the corresponding backend logic, ensuring seamless execution of user commands and retrieval of relevant data.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/main.ts'>main.ts</a></b></td>
				<td>- Initialize Vue app with Pinia, Google login, and chart plugin<br>- Set up stores for user info, link modal, toast alerts, and success<br>- Define command and query factories<br>- Mount the app to the DOM.</td>
			</tr>
			</table>
			<details>
				<summary><b>infra</b></summary>
				<blockquote>
					<details>
						<summary><b>Utils</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/infra/Utils/DateUtils.ts'>DateUtils.ts</a></b></td>
								<td>- DateUtils.ts in src/infra/Utils provides functions for creating, formatting, and converting dates using the moment library<br>- It enhances the codebase by centralizing date-related operations, ensuring consistent date handling across the project.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/infra/Utils/QRCodeUtils.ts'>QRCodeUtils.ts</a></b></td>
								<td>Enables downloading QR codes generated within the project by providing a utility function in the QRCodeUtils class.</td>
							</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
			<details>
				<summary><b>domain</b></summary>
				<blockquote>
					<details>
						<summary><b>enums</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/domain/enums/LinkType.ts'>LinkType.ts</a></b></td>
								<td>Defines link types for the project's domain, distinguishing between enabled and disabled states.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/domain/enums/ProviderType.ts'>ProviderType.ts</a></b></td>
								<td>Defines ProviderType enum values for different authentication providers in the project's domain.</td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>store</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/domain/store/CreateLinkModal.store.ts'>CreateLinkModal.store.ts</a></b></td>
								<td>- Manages state and actions for creating links in the store<br>- Controls the visibility of the modal for creating links, providing methods to open and close the modal.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/domain/store/ToastAlert.store.ts'>ToastAlert.store.ts</a></b></td>
								<td>- Defines a Pinia store for managing toast alerts in the domain layer<br>- Manages toast message content and visibility, providing actions to set messages, open and close toast alerts<br>- Enables displaying toast alerts for a specified duration before automatically closing<br>- Enhances user experience by facilitating timely and informative notifications.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/domain/store/ToastSuccess.store.ts'>ToastSuccess.store.ts</a></b></td>
								<td>- Defines a Pinia store for managing success toast notifications<br>- Manages the state of the success toast message and visibility<br>- Provides actions to set the message, open the toast for display, and close it after a specified duration<br>- Facilitates seamless handling of success notifications within the application.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/domain/store/UserInfo.store.ts'>UserInfo.store.ts</a></b></td>
								<td>- Manages user authentication and link information for the application<br>- Handles login/logout functionality, updating and retrieving link information, and modifying link details<br>- Facilitates user state management and interaction with cookies and routing.</td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>model</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/domain/model/UserShortLinkInfo.ts'>UserShortLinkInfo.ts</a></b></td>
								<td>- Defines a UserShortLinkInfo class that encapsulates a user's enabled and disabled short link information<br>- This class is crucial for managing and organizing user-specific link data within the project's domain model architecture.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/domain/model/LinkStat.ts'>LinkStat.ts</a></b></td>
								<td>- Defines a LinkStat model class with properties for total count, short link, refer count, IP count, user agent count, and create date<br>- This class encapsulates data related to link statistics within the project's domain model.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/domain/model/LinkInfo.ts'>LinkInfo.ts</a></b></td>
								<td>- Defines a model for storing link information, including ID, short link, user ID, original link, expiration date, and creation date<br>- This model encapsulates essential data related to links within the project's domain architecture.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/domain/model/User.ts'>User.ts</a></b></td>
								<td>- Defines a User model with id, name, and email properties<br>- This model encapsulates user data within the domain layer, facilitating structured representation and manipulation of user information throughout the codebase architecture.</td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>service</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/domain/service/LinkInfoSvc.ts'>LinkInfoSvc.ts</a></b></td>
								<td>Validates short links, original links, and expiration dates based on specific rules to ensure data integrity and security within the project's domain service.</td>
							</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
			<details>
				<summary><b>view</b></summary>
				<blockquote>
					<details>
						<summary><b>components</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/view/components/Main.vue'>Main.vue</a></b></td>
								<td>- Implements main view components for the project, including HeaderBar, ToastAlert, and ToastSuccess<br>- Renders these components in the template using Pug syntax and scoped styling.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/view/components/HeaderBar.vue'>HeaderBar.vue</a></b></td>
								<td>- Implements the header bar functionality for the Vue.js project, handling user authentication, navigation, and logout actions<br>- Manages the display of navigation links, user login status, and triggers logout functionality<br>- Integrates with Vuex for state management and Vue Router for navigation.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/view/components/Register.vue'>Register.vue</a></b></td>
								<td>- Implements user registration functionality in the Vue component Register.vue, handling form submission and user input validation<br>- Displays a modal for users to input their name, email, and password, with options to log in or return to the homepage<br>- Styling includes a responsive layout and social login buttons.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/view/components/Home.vue'>Home.vue</a></b></td>
								<td>- Implements functionality for shortening URLs, displaying QR codes, and managing tags on the home page of the web application<br>- Handles user input validation, API requests, and interactive features like tag carousels and copying short links<br>- Supports user-friendly interactions for generating and sharing shortened links efficiently.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/view/components/Contact.vue'>Contact.vue</a></b></td>
								<td>Defines the contact component view in the project, showcasing contact information in a structured manner.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/view/components/Login.vue'>Login.vue</a></b></td>
								<td>- Implements Google login functionality, including validation and API calls, for the Login component<br>- Handles user authentication using Google credentials, displaying toast alerts for validation errors or login failures<br>- Integrates with the main command factory and router for seamless user experience.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/view/components/SystemDesign.vue'>SystemDesign.vue</a></b></td>
								<td>Showcases GitHub links and system design diagrams for User Server, Short Link Server, and Web View in a Vue component.</td>
							</tr>
							</table>
							<details>
								<summary><b>userLinkInfoStat</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/view/components/userLinkInfoStat/UserLinkInfoStatView.vue'>UserLinkInfoStatView.vue</a></b></td>
										<td>- Generates an overview of user link statistics, displaying total access count, last update time, IP, referer, and user agent data in a visually appealing format using CanvasJS charts<br>- The code fetches and processes link statistics, populating the charts with relevant data for easy monitoring and analysis within the dashboard-style interface.</td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>userDashboard</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/view/components/userDashboard/UserDashboardView.vue'>UserDashboardView.vue</a></b></td>
										<td>- Manages user dashboard functionality, including displaying enabled/disabled links and allowing users to create new links<br>- Handles tab navigation, modal display, and user authentication<br>- Implements Vue components for a seamless user experience.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/view/components/userDashboard/EnableLinkInfo.vue'>EnableLinkInfo.vue</a></b></td>
										<td>- Enables users to manage and edit link information, including changing the original link and expiration date, disabling links, copying short links, downloading QR codes, and viewing statistics<br>- Facilitates seamless interaction with link data for improved user experience and functionality within the dashboard component.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/view/components/userDashboard/DisableLinkInfo.vue'>DisableLinkInfo.vue</a></b></td>
										<td>- Enables users to manage and modify expiration dates for short links, facilitating link activation and QR code downloads<br>- Supports link copying, expiration date editing, and statistical analysis<br>- Enhances user experience by providing a comprehensive dashboard for link management and monitoring.</td>
									</tr>
									</table>
									<details>
										<summary><b>modal</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/view/components/userDashboard/modal/CreateLinkInfo.vue'>CreateLinkInfo.vue</a></b></td>
												<td>- Facilitates creating short links with custom expiration dates and types, handling validation and API calls<br>- Manages user input for original and custom short links, expiration settings, and error messages<br>- Integrates with command and store functionalities for seamless link creation within the user dashboard modal.</td>
											</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<details>
								<summary><b>toast</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/view/components/toast/ToastSuccess.vue'>ToastSuccess.vue</a></b></td>
										<td>- Implements a toast component for displaying success messages in the application<br>- Uses store management to show and close the toast with a customizable success message<br>- Positioned at the top of the screen, the component provides a user-friendly notification experience for successful actions.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/view/components/toast/ToastAlert.vue'>ToastAlert.vue</a></b></td>
										<td>- Improve user experience by displaying toast alerts for important messages<br>- The ToastAlert component in src/view/components/toast/ToastAlert.vue manages the display of toast notifications, enhancing user interaction with the application.</td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>errorPage</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/view/components/errorPage/ErrorLink.vue'>ErrorLink.vue</a></b></td>
										<td>Improve error page user experience by providing clickable links for quick navigation.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/view/components/errorPage/ErrorUser.vue'>ErrorUser.vue</a></b></td>
										<td>Improve user experience by displaying a custom error page when errors occur.</td>
									</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<details>
						<summary><b>router</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/view/router/index.ts'>index.ts</a></b></td>
								<td>- Defines Vue router configuration with routes for different views, including Main, Home, User Dashboard, System Design, Contact, Login, Register, and Link Statistics<br>- Creates router instance with specified options using Vue Router library<br>- Facilitates navigation and view rendering within the web application.</td>
							</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
			<details>
				<summary><b>application</b></summary>
				<blockquote>
					<details>
						<summary><b>cqrs</b></summary>
						<blockquote>
							<details>
								<summary><b>query</b></summary>
								<blockquote>
									<details>
										<summary><b>base</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/query/base/QueryValidateResult.ts'>QueryValidateResult.ts</a></b></td>
												<td>Defines a class for validating query results, indicating validity and error codes.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/query/base/QueryHandler.ts'>QueryHandler.ts</a></b></td>
												<td>Defines a contract for handling queries and retrieving exception messages within the CQRS architecture of the project.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/query/base/QueryFactory.ts'>QueryFactory.ts</a></b></td>
												<td>- Manages registration and retrieval of query handlers and validators based on query names<br>- Facilitates decoupling of query processing logic by mapping queries to handlers and validators<br>- Centralizes query handling and validation logic for improved maintainability and extensibility in the codebase architecture.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/query/base/QueryValidator.ts'>QueryValidator.ts</a></b></td>
												<td>Validates queries and provides validation messages for a given query in the project's CQRS architecture.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/query/base/Query.ts'>Query.ts</a></b></td>
												<td>Defines a base interface for queries in the CQRS pattern, facilitating the separation of concerns between read and write operations in the project architecture.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>GetUserShortLinkInfo</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/query/GetUserShortLinkInfo/GetUserShortLinkHandler.ts'>GetUserShortLinkHandler.ts</a></b></td>
												<td>- Handles fetching user short link information from the server, updating the store with the retrieved data, and handling various error scenarios like server errors, token invalidation, and unknown errors<br>- It also provides exception messages based on specific error codes.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/query/GetUserShortLinkInfo/dummy.ts'>dummy.ts</a></b></td>
												<td>Expose dummy user short link information for querying user short link details.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/query/GetUserShortLinkInfo/GetUserShortLinkQuery.ts'>GetUserShortLinkQuery.ts</a></b></td>
												<td>Retrieves user short link information for the application's query functionality, enhancing user experience and data retrieval efficiency within the codebase architecture.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>GetUserLinkStat</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/query/GetUserLinkStat/GetUserLinkStatHandler.ts'>GetUserLinkStatHandler.ts</a></b></td>
												<td>- Handles querying user link statistics, fetching data from the API based on the provided link<br>- Manages different response scenarios, such as server errors or invalid tokens, ensuring proper error handling and user logout functionality<br>- Registers the handler for the GetUserLinkStatQuery to retrieve and display link statistics accurately within the application.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/query/GetUserLinkStat/dummy.ts'>dummy.ts</a></b></td>
												<td>Expose user link statistics for analysis and tracking within the application's query system.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/query/GetUserLinkStat/GetUserLinkStatQuery.ts'>GetUserLinkStatQuery.ts</a></b></td>
												<td>Retrieves user link statistics for a given link.</td>
											</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<details>
								<summary><b>command</b></summary>
								<blockquote>
									<details>
										<summary><b>Login</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/command/Login/dummy.ts'>dummy.ts</a></b></td>
												<td>Defines a dummy user object for login command in the application's CQRS architecture.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/command/Login/LoginValidator.ts'>LoginValidator.ts</a></b></td>
												<td>- Validates login commands based on provider type, ensuring required fields are not empty<br>- Handles different validation rules for WEB and GOOGLE provider types, returning appropriate error messages<br>- Integrated into the command validation process within the CQRS architecture to maintain data integrity and security.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/command/Login/LoginCommand.ts'>LoginCommand.ts</a></b></td>
												<td>- Defines a LoginCommand class handling user login details, including email, password, and provider type<br>- This class encapsulates the necessary data for executing login operations within the application's command architecture.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/command/Login/LoginHandler.ts'>LoginHandler.ts</a></b></td>
												<td>- Implements a command handler for user login functionality<br>- Handles login requests by sending data to the user API endpoint for authentication<br>- If the base URL is set to 'dummy', it returns a predefined user object; otherwise, it interacts with the API to authenticate users and manage user session information.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>AddLinkInfo</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/command/AddLinkInfo/dummy.ts'>dummy.ts</a></b></td>
												<td>- Defines a dummy data structure for adding link information in the command part of the CQRS architecture<br>- This file serves as a template for creating new link entries with essential details like ID, short link, user ID, original link, and expiration date.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/command/AddLinkInfo/AddLinkInfoValidator.ts'>AddLinkInfoValidator.ts</a></b></td>
												<td>- Validates and ensures the correctness of data for adding link information<br>- Checks short link and original link lengths, and expiration date validity<br>- Registers validation rules and returns error messages if data is invalid.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/command/AddLinkInfo/AddLinkInfoCommand.ts'>AddLinkInfoCommand.ts</a></b></td>
												<td>- Manages adding link information to the system, encapsulating details like short link, original link, and expiration date<br>- This command plays a crucial role in the CQRS architecture by handling the creation of new link information entities.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/command/AddLinkInfo/AddLinkInfoHandler.ts'>AddLinkInfoHandler.ts</a></b></td>
												<td>- Handles adding link information by sending a POST request to the API endpoint<br>- It processes the response based on different status codes, handling errors and exceptions accordingly<br>- The handler also includes logic for handling specific exception messages and redirects users when needed.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>ChangeExpireDate</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/command/ChangeExpireDate/ChangeExpireDateCommand.ts'>ChangeExpireDateCommand.ts</a></b></td>
												<td>Defines a command class for changing expiration dates within the application's CQRS architecture.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/command/ChangeExpireDate/ChangeExpireHandler.ts'>ChangeExpireHandler.ts</a></b></td>
												<td>- Handles changing expiration dates for links, interacting with the API based on the environment<br>- Manages responses and exceptions, updating link information accordingly.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/command/ChangeExpireDate/dummy.ts'>dummy.ts</a></b></td>
												<td>Implements a dummy command for changing expiration dates within the CQRS architecture, contributing to the project's command handling functionality.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>base</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/command/base/Command.ts'>Command.ts</a></b></td>
												<td>- Defines a base interface for commands in the CQRS architecture, facilitating the execution of actions within the application<br>- This interface serves as a blueprint for implementing various command types, enabling the separation of concerns between command definitions and their corresponding handlers.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/command/base/CommandValidator.ts'>CommandValidator.ts</a></b></td>
												<td>Validates commands and provides validation messages for a given command in the CQRS architecture.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/command/base/CommandFactory.ts'>CommandFactory.ts</a></b></td>
												<td>- Manages registration and retrieval of command handlers and validators for the CQRS architecture<br>- Centralizes mapping of commands to their respective handlers and validators, facilitating command execution and validation across the codebase.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/command/base/CommandHandler.ts'>CommandHandler.ts</a></b></td>
												<td>Defines a contract for handling commands in the CQRS architecture, specifying a method to handle a command and retrieve an exception message.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/command/base/CommandValidateResult.ts'>CommandValidateResult.ts</a></b></td>
												<td>- Defines a class for validating command results in the project's CQRS architecture<br>- The class encapsulates information about the validity of a command and any associated error codes<br>- This component plays a crucial role in ensuring the integrity and correctness of command execution within the codebase.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>ChangeOriginLink</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/command/ChangeOriginLink/ChangeOriginLinkCommand.ts'>ChangeOriginLinkCommand.ts</a></b></td>
												<td>Implements a command for changing the origin link in the CQRS architecture of the project.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/command/ChangeOriginLink/ChangeOriginLinkHandler.ts'>ChangeOriginLinkHandler.ts</a></b></td>
												<td>- Handles changing the origin link information by sending a PATCH request to the server<br>- Manages different server responses, updating user info accordingly<br>- Registers the handler for the ChangeOriginLinkCommand in the CommandFactory.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/command/ChangeOriginLink/dummy.ts'>dummy.ts</a></b></td>
												<td>Implements a dummy command for changing origin links in the CQRS architecture, contributing to the project's modular and scalable design.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>Logout</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/command/Logout/LogoutValidator.ts'>LogoutValidator.ts</a></b></td>
												<td>- Validates logout commands by checking for a valid token in cookies<br>- Registers the validator for the LogoutCommand<br>- Returns validation result with error codes if token is missing.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/command/Logout/LogoutHandler.ts'>LogoutHandler.ts</a></b></td>
												<td>- Implements a command handler for logging out users<br>- Handles the logout command by sending a request to the user logout endpoint<br>- If the base URL is not a dummy value, it triggers the logout process and updates the user information store accordingly<br>- Handles server errors and unknown errors appropriately.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/command/Logout/LogoutCommand.ts'>LogoutCommand.ts</a></b></td>
												<td>Implements a command for logging out users, adhering to the project's CQRS architecture.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>EnabledLinkInfo</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/command/EnabledLinkInfo/EnabledLinkInfoCommand.ts'>EnabledLinkInfoCommand.ts</a></b></td>
												<td>Enables the setting of expiration dates for link information within the command layer of the CQRS architecture.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/command/EnabledLinkInfo/dummy.ts'>dummy.ts</a></b></td>
												<td>Enables a dummy feature within the CQRS command structure, contributing to the project's architecture.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/command/EnabledLinkInfo/EnabledLinkInfoValidator.ts'>EnabledLinkInfoValidator.ts</a></b></td>
												<td>- Validates and ensures the correctness of enabled link information commands, enforcing rules for ID validity and expiration date accuracy<br>- Registers the validator for the EnabledLinkInfoCommand type, contributing to the command validation process within the project's CQRS architecture.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/command/EnabledLinkInfo/EnabledLinkInfoHandler.ts'>EnabledLinkInfoHandler.ts</a></b></td>
												<td>- Handles enabling link information by fetching data from the API, updating the user's link status, and handling various server responses<br>- Registers the command handler and provides exception messages based on response codes.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>DisabledLinkInfo</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/command/DisabledLinkInfo/DisabledLinkInfoCommand.ts'>DisabledLinkInfoCommand.ts</a></b></td>
												<td>Enables disabling link information through a command in the CQRS architecture of the project.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/command/DisabledLinkInfo/DisabledLinkInfoHandler.ts'>DisabledLinkInfoHandler.ts</a></b></td>
												<td>- Handles disabling link information based on user actions, interacting with the API to update link status<br>- Manages exceptions and redirects users if needed, ensuring a smooth user experience during link disabling operations.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/src/application/cqrs/command/DisabledLinkInfo/dummy.ts'>dummy.ts</a></b></td>
												<td>Enables a dummy variable within the DisabledLinkInfo command in the CQRS application, contributing to the project's architecture.</td>
											</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
						</blockquote>
					</details>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<details> <!-- .github Submodule -->
		<summary><b>.github</b></summary>
		<blockquote>
			<details>
				<summary><b>workflows</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/coco40725/coco-short-link-frontend-view/blob/master/.github/workflows/deploy-to-prod.yml'>deploy-to-prod.yml</a></b></td>
						<td>- Automates deployment to production environment on tagged pushes, using specified Node.js version<br>- Sets up Node.js, installs dependencies, and deploys to production<br>- Utilizes GCP credentials securely stored in secrets for deployment.</td>
					</tr>
					</table>
				</blockquote>
			</details>
		</blockquote>
	</details>
</details>

---
##  Getting Started

###  Prerequisites

Before getting started with coco-short-link-frontend-view, ensure your runtime environment meets the following requirements:

- **Programming Language:** TypeScript
- **Package Manager:** Npm


###  Installation

Install coco-short-link-frontend-view using one of the following methods:

**Build from source:**

1. Clone the coco-short-link-frontend-view repository:
```sh
❯ git clone https://github.com/coco40725/coco-short-link-frontend-view
```

2. Navigate to the project directory:
```sh
❯ cd coco-short-link-frontend-view
```

3. Install the project dependencies:


**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm install
```




###  Usage
Run coco-short-link-frontend-view using the following command:
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm start
```


###  Testing
Run the test suite using the following command:
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm test
```


---
##  Project Roadmap

- [X] **`Task 1`**: <strike>Implement feature one.</strike>
- [ ] **`Task 2`**: Implement feature two.
- [ ] **`Task 3`**: Implement feature three.

---

##  Contributing

- **💬 [Join the Discussions](https://github.com/coco40725/coco-short-link-frontend-view/discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://github.com/coco40725/coco-short-link-frontend-view/issues)**: Submit bugs found or log feature requests for the `coco-short-link-frontend-view` project.
- **💡 [Submit Pull Requests](https://github.com/coco40725/coco-short-link-frontend-view/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/coco40725/coco-short-link-frontend-view
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/coco40725/coco-short-link-frontend-view/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=coco40725/coco-short-link-frontend-view">
   </a>
</p>
</details>

---

##  License

This project is protected under the [SELECT-A-LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

##  Acknowledgments

- List any resources, contributors, inspiration, etc. here.

---
