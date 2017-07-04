<!DOCTYPE html>
<html>
<head>
    <title>Lich su gia</title>
    <link rel="stylesheet" href="/stylesheets/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/css/materialize.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/js/materialize.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"></script>
</head>
<body>
<!-- header-->
<div class="">
    <div class="row">
        <div class="col s12">
            <div class="header s12">
                <nav class="light-blue">
                    <div class="nav-wrapper"><a href="" class="brand-logo">Lacda.vn</a>
                        <ul id="nav-mobile" class="right hide-on-med-and-down">
                            <li><a href="">Home</a></li>
                            <li><a href="">Message<span class="new badge">4</span></a></li>
                            <li><a href="">Login</a></li>
                        </ul>
                    </div>
                </nav>

                <div class="center-align s12">
                    <div class="input-field s6">
                        <form action="search">
                            <input placeholder="Nhập link sản phẩm" type="text" name="search">
                            {{--<label for="first_name">First Name</label>--}}
                        </form>
                    </div>
                </div>

                <div class="fixed-action-btn horizontal"><a class="btn-floating btn-large red"><i class="large material-icons">mode_edit</i></a>
                    <ul>
                        <li><a class="btn-floating red"><i class="material-icons">insert_chart</i></a></li>
                        <li><a class="btn-floating yellow darken-1"><i class="material-icons">format_quote</i></a></li>
                        <li><a class="btn-floating green"><i class="material-icons">publish</i></a></li>
                        <li><a class="btn-floating blue"><i class="material-icons">attach_file</i></a></li>
                    </ul>
                </div>
            </div>
            <!-- content-->
            <div class="content col-xs-12">
            @yield('content')
            </div>

            <!-- footer-->
            {{--<footer class="page-footer light-blue">--}}
                {{--<div class="container">--}}
                    {{--<div class="row">--}}
                        {{--<div class="col l6 s12">--}}
                            {{--<h5 class="white-text">Footer Content</h5>--}}
                            {{--<p class="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>--}}
                        {{--</div>--}}
                        {{--<div class="col l4 offset-l2 s12">--}}
                            {{--<h5 class="white-text">Links</h5>--}}
                            {{--<ul>--}}
                                {{--<li><a class="grey-text text-lighten-3" href="#!">Link 1</a></li>--}}
                                {{--<li><a class="grey-text text-lighten-3" href="#!">Link 2</a></li>--}}
                                {{--<li><a class="grey-text text-lighten-3" href="#!">Link 3</a></li>--}}
                                {{--<li><a class="grey-text text-lighten-3" href="#!">Link 4</a></li>--}}
                            {{--</ul>--}}
                        {{--</div>--}}
                    {{--</div>--}}
                {{--</div>--}}
                {{--<div class="footer-copyright">--}}
                    {{--<div class="container">--}}
                        {{--© 2014 Copyright Text--}}
                        {{--<a class="grey-text text-lighten-4 right" href="#!">More Links</a>--}}
                    {{--</div>--}}
                {{--</div>--}}
            {{--</footer>--}}

        </div>
    </div>
</div>
<!-- scripts-->
<script src="{{ asset('static/js/custom.js') }}"></script>
</body>
</html>