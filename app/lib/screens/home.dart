import 'package:flutter/material.dart';
import 'package:polyess/screens/home_screen.dart';
import 'package:polyess/screens/leaderboard_screen.dart';
import 'package:polyess/screens/market_screen.dart';

class Home extends StatefulWidget {



  const Home({Key? key}) : super(key: key);

  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  PageController pageController = PageController();
  int _index = 0;

  void onTapped(int index) {
    setState(() {
      _index = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    final _pageController = PageController();
    return SafeArea(
      child: Scaffold(

        bottomNavigationBar: BottomNavigationBar(
          items: [
            BottomNavigationBarItem(
              icon: Icon(Icons.home_rounded),
              label: 'Home',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.leaderboard),
              label: 'Leader Board',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.shopping_basket_rounded),
              label: 'Market Place',
            ),
          ],
          selectedItemColor: Colors.blue,
          currentIndex: _index,
          onTap: onTapped,
          elevation: 0,
          type: BottomNavigationBarType.fixed,
        ),
        body: PageView(
          controller: _pageController,
          children: [
            HomeScreen(),
            LeaderBoardSceen(),
            MarketPlaceScreen(),

          ],
        ),
      ),
    );
  }
}
