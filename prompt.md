# Requirements

- Create blog app in the given folder
- Each article can accept comments
- Data must be stored in sqlight as file
- Use nextjs, typescript, drizzle
- UAT must pass
  - Run your UAT with `WEB_APP_PATH=[path to your nextjs app] npm test`
  - Refer to `uat/tests/blog.spec.ts` for requirement details
  - Don't start app with `npm run dev` or `npm start` as UAT will automatically start the app
- Implement minimum features to pass UAT

# Don'ts

- Authentication
- Initial data seeding
- Don't modify tests or test configuration. These files are stored in `uat` folder.
- Don't use `killall`
