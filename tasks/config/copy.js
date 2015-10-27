// copy: Copies remaining files to places other tasks can use
module.exports = {
    dist: {
        expand: true,
        dot: true,
        cwd: '<%= project.src %>',
        src: [
            '**/<%= project.html.files %>',
            '**/<%= project.img.files %>',
            '**/<%= project.js.files %>',
            '**/<%= project.css.files %>',
            '**/<%= project.fonts.files %>'
        ],
        dest: '<%= project.dist %>'
    }
}
