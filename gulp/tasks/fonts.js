import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

export const otf2ttf = () => {
    return app.gulp
        .src(`${app.path.srcFolder}/fonts/*.otf`, {})
        .pipe(
            app.plugins.plumber(
                app.plugins.notify.onError({
                    title: "FONTS",
                    message: "Error: <%= error.message %>",
                })
            )
        )
        .pipe(
            fonter({
                formats: ["ttf"],
            })
        )
        .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`));
};

export const ttfToWoff = () => {
    return app.gulp
        .src(`${app.path.srcFolder}/fonts/*.ttf`, {})
        .pipe(
            app.plugins.plumber(
                app.plugins.notify.onError({
                    title: "FONTS",
                    message: "Error: <%= error.message %>",
                })
            )
        )
        .pipe(
            fonter({
                formats: ["woff"],
            })
        )
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))
        .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
        .pipe(ttf2woff2())
        .pipe(app.gulp.dest(`${app.path.build.fonts}`));
};
export const copyWoff = () => {
    return app.gulp
        .src(`${app.path.srcFolder}/fonts/*.woff`)
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))
        .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.woff2`))
        .pipe(app.gulp.dest(`${app.path.build.fonts}`));
};

export const fontsStyle = () => {
    let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;

    // Проверяем наличие папки с шрифтами
    fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
        if (fontsFiles) {
            // Если файл существует, удаляем его
            if (fs.existsSync(fontsFile)) {
                fs.unlinkSync(fontsFile);
                console.log("Файл scss/fonts.scss актуализирован");
            } else {
                console.log("Файл scss/fonts.scss создан");
            }

            // Создаем новый файл
            fs.writeFile(fontsFile, "", cb);
            let newFileOnly;

            for (let i = 0; i < fontsFiles.length; i++) {
                let fontFileName = fontsFiles[i].split(".")[0];
                if (newFileOnly !== fontFileName) {

                    // Разбиваем имя файла на части
                    const parts = fontFileName.split("-");
                    let fontName = parts[0] ? parts[0] : fontFileName;
                    let fontWeight = 'regular'; // По умолчанию regular
                    let fontStyle = 'normal'; // По умолчанию normal

                    // Проверяем, есть ли 'italic' в имени файла
                    if (fontFileName.toLowerCase().includes("italic")) {
                        fontStyle = "italic";
                    }

                    // Определяем вес шрифта
                    // Используем цикл, чтобы проверить все части имени
                    for (let j = 1; j < parts.length; j++) {
                        const part = parts[j].toLowerCase();
                        switch (part) {
                            case "thin":
                                fontWeight = 100;
                                break;
                            case "extralight":
                                fontWeight = 200;
                                break;
                            case "light":
                                fontWeight = 300;
                                break;
                            case "book":
                                fontWeight = 350;
                                break;
                            case "medium":
                                fontWeight = 500;
                                break;
                            case "semibold":
                            case "demi":
                                fontWeight = 600;
                                break;
                            case "bold":
                                fontWeight = 700;
                                break;
                            case "extrabold":
                            case "heavy":
                                fontWeight = 800;
                                break;
                            case "black":
                                fontWeight = 900;
                                break;
                            case "italic":
                                // Уже обработано, игнорируем, чтобы не перезаписать вес
                                break;
                            default:
                                // Если часть не является известным весом, игнорируем ее
                                // Это может быть полезно для имен типа 'Font-Weight-Something'
                                break;
                        }
                    }

                    // Если вес так и не был определен, устанавливаем его как 400 (regular)
                    if (fontWeight === 'regular') {
                        fontWeight = 400;
                    }

                    fs.appendFile(fontsFile,
                        `@font-face {
                            font-family: '${fontName}';
                            font-display: swap;
                            src: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");
                            font-weight: ${fontWeight};
                            font-style: ${fontStyle};
                        }\r\n`, cb);
                    newFileOnly = fontFileName;
                }
            }
        }
    });

    return app.gulp.src(`${app.path.srcFolder}`);
    function cb() { }
};