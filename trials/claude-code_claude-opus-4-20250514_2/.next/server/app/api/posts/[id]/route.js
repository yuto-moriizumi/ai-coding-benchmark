/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/posts/[id]/route";
exports.ids = ["app/api/posts/[id]/route"];
exports.modules = {

/***/ "(rsc)/./app/api/posts/[id]/route.ts":
/*!*************************************!*\
  !*** ./app/api/posts/[id]/route.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/db */ \"(rsc)/./db/index.ts\");\n/* harmony import */ var _db_schema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/db/schema */ \"(rsc)/./db/schema.ts\");\n/* harmony import */ var drizzle_orm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! drizzle-orm */ \"(rsc)/./node_modules/drizzle-orm/sql/expressions/conditions.js\");\n\n\n\n\nasync function GET(request, props) {\n    const params = await props.params;\n    const post = await _db__WEBPACK_IMPORTED_MODULE_1__.db.select().from(_db_schema__WEBPACK_IMPORTED_MODULE_2__.posts).where((0,drizzle_orm__WEBPACK_IMPORTED_MODULE_3__.eq)(_db_schema__WEBPACK_IMPORTED_MODULE_2__.posts.id, parseInt(params.id))).limit(1);\n    if (post.length === 0) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Post not found'\n        }, {\n            status: 404\n        });\n    }\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(post[0]);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3Bvc3RzL1tpZF0vcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBMEM7QUFDakI7QUFDVTtBQUNIO0FBRXpCLGVBQWVJLElBQ3BCQyxPQUFnQixFQUNoQkMsS0FBMEM7SUFFMUMsTUFBTUMsU0FBUyxNQUFNRCxNQUFNQyxNQUFNO0lBQ2pDLE1BQU1DLE9BQU8sTUFBTVAsbUNBQUVBLENBQUNRLE1BQU0sR0FBR0MsSUFBSSxDQUFDUiw2Q0FBS0EsRUFBRVMsS0FBSyxDQUFDUiwrQ0FBRUEsQ0FBQ0QsNkNBQUtBLENBQUNVLEVBQUUsRUFBRUMsU0FBU04sT0FBT0ssRUFBRSxJQUFJRSxLQUFLLENBQUM7SUFFMUYsSUFBSU4sS0FBS08sTUFBTSxLQUFLLEdBQUc7UUFDckIsT0FBT2YscURBQVlBLENBQUNnQixJQUFJLENBQUM7WUFBRUMsT0FBTztRQUFpQixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUN0RTtJQUVBLE9BQU9sQixxREFBWUEsQ0FBQ2dCLElBQUksQ0FBQ1IsSUFBSSxDQUFDLEVBQUU7QUFDbEMiLCJzb3VyY2VzIjpbIi9ob21lL3lzaWtpc2hva3VyaW4vYWktY29kaW5nLWJlbmNobWFyay90cmlhbHMvY2xhdWRlLWNvZGVfY2xhdWRlLW9wdXMtNC0yMDI1MDUxNF8yL2FwcC9hcGkvcG9zdHMvW2lkXS9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcidcbmltcG9ydCB7IGRiIH0gZnJvbSAnQC9kYidcbmltcG9ydCB7IHBvc3RzIH0gZnJvbSAnQC9kYi9zY2hlbWEnXG5pbXBvcnQgeyBlcSB9IGZyb20gJ2RyaXp6bGUtb3JtJ1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKFxuICByZXF1ZXN0OiBSZXF1ZXN0LFxuICBwcm9wczogeyBwYXJhbXM6IFByb21pc2U8eyBpZDogc3RyaW5nIH0+IH1cbikge1xuICBjb25zdCBwYXJhbXMgPSBhd2FpdCBwcm9wcy5wYXJhbXNcbiAgY29uc3QgcG9zdCA9IGF3YWl0IGRiLnNlbGVjdCgpLmZyb20ocG9zdHMpLndoZXJlKGVxKHBvc3RzLmlkLCBwYXJzZUludChwYXJhbXMuaWQpKSkubGltaXQoMSlcbiAgXG4gIGlmIChwb3N0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnUG9zdCBub3QgZm91bmQnIH0sIHsgc3RhdHVzOiA0MDQgfSlcbiAgfVxuICBcbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHBvc3RbMF0pXG59Il0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImRiIiwicG9zdHMiLCJlcSIsIkdFVCIsInJlcXVlc3QiLCJwcm9wcyIsInBhcmFtcyIsInBvc3QiLCJzZWxlY3QiLCJmcm9tIiwid2hlcmUiLCJpZCIsInBhcnNlSW50IiwibGltaXQiLCJsZW5ndGgiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/posts/[id]/route.ts\n");

/***/ }),

/***/ "(rsc)/./db/index.ts":
/*!*********************!*\
  !*** ./db/index.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   db: () => (/* binding */ db)\n/* harmony export */ });\n/* harmony import */ var drizzle_orm_better_sqlite3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! drizzle-orm/better-sqlite3 */ \"(rsc)/./node_modules/drizzle-orm/better-sqlite3/driver.js\");\n/* harmony import */ var better_sqlite3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! better-sqlite3 */ \"better-sqlite3\");\n/* harmony import */ var better_sqlite3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(better_sqlite3__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _schema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./schema */ \"(rsc)/./db/schema.ts\");\n\n\n\nconst sqlite = new (better_sqlite3__WEBPACK_IMPORTED_MODULE_0___default())('./blog.db');\nconst db = (0,drizzle_orm_better_sqlite3__WEBPACK_IMPORTED_MODULE_2__.drizzle)(sqlite, {\n    schema: _schema__WEBPACK_IMPORTED_MODULE_1__\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9kYi9pbmRleC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFvRDtBQUNmO0FBQ0g7QUFFbEMsTUFBTUcsU0FBUyxJQUFJRix1REFBUUEsQ0FBQztBQUNyQixNQUFNRyxLQUFLSixtRUFBT0EsQ0FBQ0csUUFBUTtJQUFFRCxNQUFNQSxzQ0FBQUE7QUFBQyxHQUFFIiwic291cmNlcyI6WyIvaG9tZS95c2lraXNob2t1cmluL2FpLWNvZGluZy1iZW5jaG1hcmsvdHJpYWxzL2NsYXVkZS1jb2RlX2NsYXVkZS1vcHVzLTQtMjAyNTA1MTRfMi9kYi9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkcml6emxlIH0gZnJvbSAnZHJpenpsZS1vcm0vYmV0dGVyLXNxbGl0ZTMnXG5pbXBvcnQgRGF0YWJhc2UgZnJvbSAnYmV0dGVyLXNxbGl0ZTMnXG5pbXBvcnQgKiBhcyBzY2hlbWEgZnJvbSAnLi9zY2hlbWEnXG5cbmNvbnN0IHNxbGl0ZSA9IG5ldyBEYXRhYmFzZSgnLi9ibG9nLmRiJylcbmV4cG9ydCBjb25zdCBkYiA9IGRyaXp6bGUoc3FsaXRlLCB7IHNjaGVtYSB9KSJdLCJuYW1lcyI6WyJkcml6emxlIiwiRGF0YWJhc2UiLCJzY2hlbWEiLCJzcWxpdGUiLCJkYiJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./db/index.ts\n");

/***/ }),

/***/ "(rsc)/./db/schema.ts":
/*!**********************!*\
  !*** ./db/schema.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   comments: () => (/* binding */ comments),\n/* harmony export */   posts: () => (/* binding */ posts)\n/* harmony export */ });\n/* harmony import */ var drizzle_orm_sqlite_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! drizzle-orm/sqlite-core */ \"(rsc)/./node_modules/drizzle-orm/sqlite-core/table.js\");\n/* harmony import */ var drizzle_orm_sqlite_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! drizzle-orm/sqlite-core */ \"(rsc)/./node_modules/drizzle-orm/sqlite-core/columns/integer.js\");\n/* harmony import */ var drizzle_orm_sqlite_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! drizzle-orm/sqlite-core */ \"(rsc)/./node_modules/drizzle-orm/sqlite-core/columns/text.js\");\n/* harmony import */ var drizzle_orm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! drizzle-orm */ \"(rsc)/./node_modules/drizzle-orm/sql/sql.js\");\n\n\nconst posts = (0,drizzle_orm_sqlite_core__WEBPACK_IMPORTED_MODULE_0__.sqliteTable)('posts', {\n    id: (0,drizzle_orm_sqlite_core__WEBPACK_IMPORTED_MODULE_1__.integer)('id').primaryKey({\n        autoIncrement: true\n    }),\n    title: (0,drizzle_orm_sqlite_core__WEBPACK_IMPORTED_MODULE_2__.text)('title').notNull(),\n    content: (0,drizzle_orm_sqlite_core__WEBPACK_IMPORTED_MODULE_2__.text)('content').notNull(),\n    createdAt: (0,drizzle_orm_sqlite_core__WEBPACK_IMPORTED_MODULE_1__.integer)('created_at', {\n        mode: 'timestamp'\n    }).notNull().default((0,drizzle_orm__WEBPACK_IMPORTED_MODULE_3__.sql)`(unixepoch())`)\n});\nconst comments = (0,drizzle_orm_sqlite_core__WEBPACK_IMPORTED_MODULE_0__.sqliteTable)('comments', {\n    id: (0,drizzle_orm_sqlite_core__WEBPACK_IMPORTED_MODULE_1__.integer)('id').primaryKey({\n        autoIncrement: true\n    }),\n    postId: (0,drizzle_orm_sqlite_core__WEBPACK_IMPORTED_MODULE_1__.integer)('post_id').notNull().references(()=>posts.id, {\n        onDelete: 'cascade'\n    }),\n    author: (0,drizzle_orm_sqlite_core__WEBPACK_IMPORTED_MODULE_2__.text)('author').notNull(),\n    content: (0,drizzle_orm_sqlite_core__WEBPACK_IMPORTED_MODULE_2__.text)('content').notNull(),\n    createdAt: (0,drizzle_orm_sqlite_core__WEBPACK_IMPORTED_MODULE_1__.integer)('created_at', {\n        mode: 'timestamp'\n    }).notNull().default((0,drizzle_orm__WEBPACK_IMPORTED_MODULE_3__.sql)`(unixepoch())`)\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9kYi9zY2hlbWEudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQW9FO0FBQ25DO0FBRTFCLE1BQU1JLFFBQVFKLG9FQUFXQSxDQUFDLFNBQVM7SUFDeENLLElBQUlILGdFQUFPQSxDQUFDLE1BQU1JLFVBQVUsQ0FBQztRQUFFQyxlQUFlO0lBQUs7SUFDbkRDLE9BQU9QLDZEQUFJQSxDQUFDLFNBQVNRLE9BQU87SUFDNUJDLFNBQVNULDZEQUFJQSxDQUFDLFdBQVdRLE9BQU87SUFDaENFLFdBQVdULGdFQUFPQSxDQUFDLGNBQWM7UUFBRVUsTUFBTTtJQUFZLEdBQUdILE9BQU8sR0FBR0ksT0FBTyxDQUFDVixnREFBRyxDQUFDLGFBQWEsQ0FBQztBQUM5RixHQUFFO0FBRUssTUFBTVcsV0FBV2Qsb0VBQVdBLENBQUMsWUFBWTtJQUM5Q0ssSUFBSUgsZ0VBQU9BLENBQUMsTUFBTUksVUFBVSxDQUFDO1FBQUVDLGVBQWU7SUFBSztJQUNuRFEsUUFBUWIsZ0VBQU9BLENBQUMsV0FBV08sT0FBTyxHQUFHTyxVQUFVLENBQUMsSUFBTVosTUFBTUMsRUFBRSxFQUFFO1FBQUVZLFVBQVU7SUFBVTtJQUN0RkMsUUFBUWpCLDZEQUFJQSxDQUFDLFVBQVVRLE9BQU87SUFDOUJDLFNBQVNULDZEQUFJQSxDQUFDLFdBQVdRLE9BQU87SUFDaENFLFdBQVdULGdFQUFPQSxDQUFDLGNBQWM7UUFBRVUsTUFBTTtJQUFZLEdBQUdILE9BQU8sR0FBR0ksT0FBTyxDQUFDVixnREFBRyxDQUFDLGFBQWEsQ0FBQztBQUM5RixHQUFFIiwic291cmNlcyI6WyIvaG9tZS95c2lraXNob2t1cmluL2FpLWNvZGluZy1iZW5jaG1hcmsvdHJpYWxzL2NsYXVkZS1jb2RlX2NsYXVkZS1vcHVzLTQtMjAyNTA1MTRfMi9kYi9zY2hlbWEudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc3FsaXRlVGFibGUsIHRleHQsIGludGVnZXIgfSBmcm9tICdkcml6emxlLW9ybS9zcWxpdGUtY29yZSdcbmltcG9ydCB7IHNxbCB9IGZyb20gJ2RyaXp6bGUtb3JtJ1xuXG5leHBvcnQgY29uc3QgcG9zdHMgPSBzcWxpdGVUYWJsZSgncG9zdHMnLCB7XG4gIGlkOiBpbnRlZ2VyKCdpZCcpLnByaW1hcnlLZXkoeyBhdXRvSW5jcmVtZW50OiB0cnVlIH0pLFxuICB0aXRsZTogdGV4dCgndGl0bGUnKS5ub3ROdWxsKCksXG4gIGNvbnRlbnQ6IHRleHQoJ2NvbnRlbnQnKS5ub3ROdWxsKCksXG4gIGNyZWF0ZWRBdDogaW50ZWdlcignY3JlYXRlZF9hdCcsIHsgbW9kZTogJ3RpbWVzdGFtcCcgfSkubm90TnVsbCgpLmRlZmF1bHQoc3FsYCh1bml4ZXBvY2goKSlgKSxcbn0pXG5cbmV4cG9ydCBjb25zdCBjb21tZW50cyA9IHNxbGl0ZVRhYmxlKCdjb21tZW50cycsIHtcbiAgaWQ6IGludGVnZXIoJ2lkJykucHJpbWFyeUtleSh7IGF1dG9JbmNyZW1lbnQ6IHRydWUgfSksXG4gIHBvc3RJZDogaW50ZWdlcigncG9zdF9pZCcpLm5vdE51bGwoKS5yZWZlcmVuY2VzKCgpID0+IHBvc3RzLmlkLCB7IG9uRGVsZXRlOiAnY2FzY2FkZScgfSksXG4gIGF1dGhvcjogdGV4dCgnYXV0aG9yJykubm90TnVsbCgpLFxuICBjb250ZW50OiB0ZXh0KCdjb250ZW50Jykubm90TnVsbCgpLFxuICBjcmVhdGVkQXQ6IGludGVnZXIoJ2NyZWF0ZWRfYXQnLCB7IG1vZGU6ICd0aW1lc3RhbXAnIH0pLm5vdE51bGwoKS5kZWZhdWx0KHNxbGAodW5peGVwb2NoKCkpYCksXG59KSJdLCJuYW1lcyI6WyJzcWxpdGVUYWJsZSIsInRleHQiLCJpbnRlZ2VyIiwic3FsIiwicG9zdHMiLCJpZCIsInByaW1hcnlLZXkiLCJhdXRvSW5jcmVtZW50IiwidGl0bGUiLCJub3ROdWxsIiwiY29udGVudCIsImNyZWF0ZWRBdCIsIm1vZGUiLCJkZWZhdWx0IiwiY29tbWVudHMiLCJwb3N0SWQiLCJyZWZlcmVuY2VzIiwib25EZWxldGUiLCJhdXRob3IiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./db/schema.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fposts%2F%5Bid%5D%2Froute&page=%2Fapi%2Fposts%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fposts%2F%5Bid%5D%2Froute.ts&appDir=%2Fhome%2Fysikishokurin%2Fai-coding-benchmark%2Ftrials%2Fclaude-code_claude-opus-4-20250514_2%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fysikishokurin%2Fai-coding-benchmark%2Ftrials%2Fclaude-code_claude-opus-4-20250514_2&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fposts%2F%5Bid%5D%2Froute&page=%2Fapi%2Fposts%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fposts%2F%5Bid%5D%2Froute.ts&appDir=%2Fhome%2Fysikishokurin%2Fai-coding-benchmark%2Ftrials%2Fclaude-code_claude-opus-4-20250514_2%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fysikishokurin%2Fai-coding-benchmark%2Ftrials%2Fclaude-code_claude-opus-4-20250514_2&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_ysikishokurin_ai_coding_benchmark_trials_claude_code_claude_opus_4_20250514_2_app_api_posts_id_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/posts/[id]/route.ts */ \"(rsc)/./app/api/posts/[id]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/posts/[id]/route\",\n        pathname: \"/api/posts/[id]\",\n        filename: \"route\",\n        bundlePath: \"app/api/posts/[id]/route\"\n    },\n    resolvedPagePath: \"/home/ysikishokurin/ai-coding-benchmark/trials/claude-code_claude-opus-4-20250514_2/app/api/posts/[id]/route.ts\",\n    nextConfigOutput,\n    userland: _home_ysikishokurin_ai_coding_benchmark_trials_claude_code_claude_opus_4_20250514_2_app_api_posts_id_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZwb3N0cyUyRiU1QmlkJTVEJTJGcm91dGUmcGFnZT0lMkZhcGklMkZwb3N0cyUyRiU1QmlkJTVEJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGcG9zdHMlMkYlNUJpZCU1RCUyRnJvdXRlLnRzJmFwcERpcj0lMkZob21lJTJGeXNpa2lzaG9rdXJpbiUyRmFpLWNvZGluZy1iZW5jaG1hcmslMkZ0cmlhbHMlMkZjbGF1ZGUtY29kZV9jbGF1ZGUtb3B1cy00LTIwMjUwNTE0XzIlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRmhvbWUlMkZ5c2lraXNob2t1cmluJTJGYWktY29kaW5nLWJlbmNobWFyayUyRnRyaWFscyUyRmNsYXVkZS1jb2RlX2NsYXVkZS1vcHVzLTQtMjAyNTA1MTRfMiZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDK0Q7QUFDNUk7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9ob21lL3lzaWtpc2hva3VyaW4vYWktY29kaW5nLWJlbmNobWFyay90cmlhbHMvY2xhdWRlLWNvZGVfY2xhdWRlLW9wdXMtNC0yMDI1MDUxNF8yL2FwcC9hcGkvcG9zdHMvW2lkXS9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvcG9zdHMvW2lkXS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3Bvc3RzL1tpZF1cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3Bvc3RzL1tpZF0vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvaG9tZS95c2lraXNob2t1cmluL2FpLWNvZGluZy1iZW5jaG1hcmsvdHJpYWxzL2NsYXVkZS1jb2RlX2NsYXVkZS1vcHVzLTQtMjAyNTA1MTRfMi9hcHAvYXBpL3Bvc3RzL1tpZF0vcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fposts%2F%5Bid%5D%2Froute&page=%2Fapi%2Fposts%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fposts%2F%5Bid%5D%2Froute.ts&appDir=%2Fhome%2Fysikishokurin%2Fai-coding-benchmark%2Ftrials%2Fclaude-code_claude-opus-4-20250514_2%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fysikishokurin%2Fai-coding-benchmark%2Ftrials%2Fclaude-code_claude-opus-4-20250514_2&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "better-sqlite3":
/*!*********************************!*\
  !*** external "better-sqlite3" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("better-sqlite3");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/drizzle-orm"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fposts%2F%5Bid%5D%2Froute&page=%2Fapi%2Fposts%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fposts%2F%5Bid%5D%2Froute.ts&appDir=%2Fhome%2Fysikishokurin%2Fai-coding-benchmark%2Ftrials%2Fclaude-code_claude-opus-4-20250514_2%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fysikishokurin%2Fai-coding-benchmark%2Ftrials%2Fclaude-code_claude-opus-4-20250514_2&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();