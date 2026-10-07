import gulp from "gulp";
import shell from "gulp-shell";

export const serve = shell.task(["npm start"]);
export const build = shell.task(["npm run build"]);
export const lint = shell.task(["npm run lint"]);
export const test = shell.task(["npm test"]);
export const e2e = shell.task(["npm run e2e"]);

// Everything that has to pass before a release.
export const check = gulp.series(lint, test, e2e, build);

export default serve;
