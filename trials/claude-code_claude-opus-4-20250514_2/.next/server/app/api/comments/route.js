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
exports.id = "app/api/comments/route";
exports.ids = ["app/api/comments/route"];
exports.modules = {

/***/ "(rsc)/./app/api/comments/route.ts":
/*!***********************************!*\
  !*** ./app/api/comments/route.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/db */ \"(rsc)/./db/index.ts\");\n/* harmony import */ var _db_schema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/db/schema */ \"(rsc)/./db/schema.ts\");\n/* harmony import */ var drizzle_orm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! drizzle-orm */ \"(rsc)/./node_modules/drizzle-orm/sql/expressions/conditions.js\");\n/* harmony import */ var drizzle_orm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! drizzle-orm */ \"(rsc)/./node_modules/drizzle-orm/sql/expressions/select.js\");\n\n\n\n\nasync function GET(request) {\n    const { searchParams } = new URL(request.url);\n    const postId = searchParams.get('postId');\n    if (!postId) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'postId is required'\n        }, {\n            status: 400\n        });\n    }\n    const postComments = await _db__WEBPACK_IMPORTED_MODULE_1__.db.select().from(_db_schema__WEBPACK_IMPORTED_MODULE_2__.comments).where((0,drizzle_orm__WEBPACK_IMPORTED_MODULE_3__.eq)(_db_schema__WEBPACK_IMPORTED_MODULE_2__.comments.postId, parseInt(postId))).orderBy((0,drizzle_orm__WEBPACK_IMPORTED_MODULE_4__.desc)(_db_schema__WEBPACK_IMPORTED_MODULE_2__.comments.createdAt));\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(postComments);\n}\nasync function POST(request) {\n    const body = await request.json();\n    const { postId, author, content } = body;\n    const newComment = await _db__WEBPACK_IMPORTED_MODULE_1__.db.insert(_db_schema__WEBPACK_IMPORTED_MODULE_2__.comments).values({\n        postId,\n        author,\n        content\n    }).returning();\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(newComment[0]);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2NvbW1lbnRzL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBMEM7QUFDakI7QUFDYTtBQUNBO0FBRS9CLGVBQWVLLElBQUlDLE9BQWdCO0lBQ3hDLE1BQU0sRUFBRUMsWUFBWSxFQUFFLEdBQUcsSUFBSUMsSUFBSUYsUUFBUUcsR0FBRztJQUM1QyxNQUFNQyxTQUFTSCxhQUFhSSxHQUFHLENBQUM7SUFFaEMsSUFBSSxDQUFDRCxRQUFRO1FBQ1gsT0FBT1YscURBQVlBLENBQUNZLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQXFCLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQzFFO0lBRUEsTUFBTUMsZUFBZSxNQUFNZCxtQ0FBRUEsQ0FBQ2UsTUFBTSxHQUNqQ0MsSUFBSSxDQUFDZixnREFBUUEsRUFDYmdCLEtBQUssQ0FBQ2YsK0NBQUVBLENBQUNELGdEQUFRQSxDQUFDUSxNQUFNLEVBQUVTLFNBQVNULFVBQ25DVSxPQUFPLENBQUNoQixpREFBSUEsQ0FBQ0YsZ0RBQVFBLENBQUNtQixTQUFTO0lBRWxDLE9BQU9yQixxREFBWUEsQ0FBQ1ksSUFBSSxDQUFDRztBQUMzQjtBQUVPLGVBQWVPLEtBQUtoQixPQUFnQjtJQUN6QyxNQUFNaUIsT0FBTyxNQUFNakIsUUFBUU0sSUFBSTtJQUMvQixNQUFNLEVBQUVGLE1BQU0sRUFBRWMsTUFBTSxFQUFFQyxPQUFPLEVBQUUsR0FBR0Y7SUFFcEMsTUFBTUcsYUFBYSxNQUFNekIsbUNBQUVBLENBQUMwQixNQUFNLENBQUN6QixnREFBUUEsRUFBRTBCLE1BQU0sQ0FBQztRQUNsRGxCO1FBQ0FjO1FBQ0FDO0lBQ0YsR0FBR0ksU0FBUztJQUVaLE9BQU83QixxREFBWUEsQ0FBQ1ksSUFBSSxDQUFDYyxVQUFVLENBQUMsRUFBRTtBQUN4QyIsInNvdXJjZXMiOlsiL2hvbWUveXNpa2lzaG9rdXJpbi9haS1jb2RpbmctYmVuY2htYXJrL3RyaWFscy9jbGF1ZGUtY29kZV9jbGF1ZGUtb3B1cy00LTIwMjUwNTE0XzIvYXBwL2FwaS9jb21tZW50cy9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcidcbmltcG9ydCB7IGRiIH0gZnJvbSAnQC9kYidcbmltcG9ydCB7IGNvbW1lbnRzIH0gZnJvbSAnQC9kYi9zY2hlbWEnXG5pbXBvcnQgeyBlcSwgZGVzYyB9IGZyb20gJ2RyaXp6bGUtb3JtJ1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgY29uc3QgeyBzZWFyY2hQYXJhbXMgfSA9IG5ldyBVUkwocmVxdWVzdC51cmwpXG4gIGNvbnN0IHBvc3RJZCA9IHNlYXJjaFBhcmFtcy5nZXQoJ3Bvc3RJZCcpXG4gIFxuICBpZiAoIXBvc3RJZCkge1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAncG9zdElkIGlzIHJlcXVpcmVkJyB9LCB7IHN0YXR1czogNDAwIH0pXG4gIH1cbiAgXG4gIGNvbnN0IHBvc3RDb21tZW50cyA9IGF3YWl0IGRiLnNlbGVjdCgpXG4gICAgLmZyb20oY29tbWVudHMpXG4gICAgLndoZXJlKGVxKGNvbW1lbnRzLnBvc3RJZCwgcGFyc2VJbnQocG9zdElkKSkpXG4gICAgLm9yZGVyQnkoZGVzYyhjb21tZW50cy5jcmVhdGVkQXQpKVxuICBcbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHBvc3RDb21tZW50cylcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogUmVxdWVzdCkge1xuICBjb25zdCBib2R5ID0gYXdhaXQgcmVxdWVzdC5qc29uKClcbiAgY29uc3QgeyBwb3N0SWQsIGF1dGhvciwgY29udGVudCB9ID0gYm9keVxuICBcbiAgY29uc3QgbmV3Q29tbWVudCA9IGF3YWl0IGRiLmluc2VydChjb21tZW50cykudmFsdWVzKHtcbiAgICBwb3N0SWQsXG4gICAgYXV0aG9yLFxuICAgIGNvbnRlbnQsXG4gIH0pLnJldHVybmluZygpXG4gIFxuICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24obmV3Q29tbWVudFswXSlcbn0iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiZGIiLCJjb21tZW50cyIsImVxIiwiZGVzYyIsIkdFVCIsInJlcXVlc3QiLCJzZWFyY2hQYXJhbXMiLCJVUkwiLCJ1cmwiLCJwb3N0SWQiLCJnZXQiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJwb3N0Q29tbWVudHMiLCJzZWxlY3QiLCJmcm9tIiwid2hlcmUiLCJwYXJzZUludCIsIm9yZGVyQnkiLCJjcmVhdGVkQXQiLCJQT1NUIiwiYm9keSIsImF1dGhvciIsImNvbnRlbnQiLCJuZXdDb21tZW50IiwiaW5zZXJ0IiwidmFsdWVzIiwicmV0dXJuaW5nIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/comments/route.ts\n");

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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcomments%2Froute&page=%2Fapi%2Fcomments%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcomments%2Froute.ts&appDir=%2Fhome%2Fysikishokurin%2Fai-coding-benchmark%2Ftrials%2Fclaude-code_claude-opus-4-20250514_2%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fysikishokurin%2Fai-coding-benchmark%2Ftrials%2Fclaude-code_claude-opus-4-20250514_2&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcomments%2Froute&page=%2Fapi%2Fcomments%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcomments%2Froute.ts&appDir=%2Fhome%2Fysikishokurin%2Fai-coding-benchmark%2Ftrials%2Fclaude-code_claude-opus-4-20250514_2%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fysikishokurin%2Fai-coding-benchmark%2Ftrials%2Fclaude-code_claude-opus-4-20250514_2&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_ysikishokurin_ai_coding_benchmark_trials_claude_code_claude_opus_4_20250514_2_app_api_comments_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/comments/route.ts */ \"(rsc)/./app/api/comments/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/comments/route\",\n        pathname: \"/api/comments\",\n        filename: \"route\",\n        bundlePath: \"app/api/comments/route\"\n    },\n    resolvedPagePath: \"/home/ysikishokurin/ai-coding-benchmark/trials/claude-code_claude-opus-4-20250514_2/app/api/comments/route.ts\",\n    nextConfigOutput,\n    userland: _home_ysikishokurin_ai_coding_benchmark_trials_claude_code_claude_opus_4_20250514_2_app_api_comments_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZjb21tZW50cyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGY29tbWVudHMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZjb21tZW50cyUyRnJvdXRlLnRzJmFwcERpcj0lMkZob21lJTJGeXNpa2lzaG9rdXJpbiUyRmFpLWNvZGluZy1iZW5jaG1hcmslMkZ0cmlhbHMlMkZjbGF1ZGUtY29kZV9jbGF1ZGUtb3B1cy00LTIwMjUwNTE0XzIlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRmhvbWUlMkZ5c2lraXNob2t1cmluJTJGYWktY29kaW5nLWJlbmNobWFyayUyRnRyaWFscyUyRmNsYXVkZS1jb2RlX2NsYXVkZS1vcHVzLTQtMjAyNTA1MTRfMiZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDNkQ7QUFDMUk7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9ob21lL3lzaWtpc2hva3VyaW4vYWktY29kaW5nLWJlbmNobWFyay90cmlhbHMvY2xhdWRlLWNvZGVfY2xhdWRlLW9wdXMtNC0yMDI1MDUxNF8yL2FwcC9hcGkvY29tbWVudHMvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2NvbW1lbnRzL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvY29tbWVudHNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2NvbW1lbnRzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL2hvbWUveXNpa2lzaG9rdXJpbi9haS1jb2RpbmctYmVuY2htYXJrL3RyaWFscy9jbGF1ZGUtY29kZV9jbGF1ZGUtb3B1cy00LTIwMjUwNTE0XzIvYXBwL2FwaS9jb21tZW50cy9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcomments%2Froute&page=%2Fapi%2Fcomments%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcomments%2Froute.ts&appDir=%2Fhome%2Fysikishokurin%2Fai-coding-benchmark%2Ftrials%2Fclaude-code_claude-opus-4-20250514_2%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fysikishokurin%2Fai-coding-benchmark%2Ftrials%2Fclaude-code_claude-opus-4-20250514_2&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/drizzle-orm"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcomments%2Froute&page=%2Fapi%2Fcomments%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcomments%2Froute.ts&appDir=%2Fhome%2Fysikishokurin%2Fai-coding-benchmark%2Ftrials%2Fclaude-code_claude-opus-4-20250514_2%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fysikishokurin%2Fai-coding-benchmark%2Ftrials%2Fclaude-code_claude-opus-4-20250514_2&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();