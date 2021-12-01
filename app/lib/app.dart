import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:polyess/models/style.dart';
import 'package:polyess/screens/home.dart';

class Polyess extends StatelessWidget {
  const Polyess({ Key? key }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Polyess',
      theme: ThemeData(
        scaffoldBackgroundColor: Colors.white,
        textTheme: GoogleFonts.interTextTheme().copyWith(
          bodyText1: textStyle1,
        )
      ),
      home: Home(),
    );
  }
}