from util.scss import compile_sass

@app.route('/sass')
def route_sass():
    compile_sass()
    return 'compiled'