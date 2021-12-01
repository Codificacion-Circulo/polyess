import 'package:flutter/material.dart';

class Profile_Stats extends StatefulWidget {
  const Profile_Stats({Key? key}) : super(key: key);

  @override
  _Profile_StatsState createState() => _Profile_StatsState();
}

class _Profile_StatsState extends State<Profile_Stats> {
  int _selectedindex = 0;

  void _onItemTapped(int index) {
    setState(() {
      _selectedindex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: BottomNavigationBar(
        showUnselectedLabels: true,
        unselectedItemColor: Color(0xff8c8c8c),
        backgroundColor: Color(0xFF0f0f0f),
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
              icon: Icon(Icons.person_rounded), label: 'Profile'),
          BottomNavigationBarItem(
              icon: Icon(Icons.storefront_rounded), label: 'Market Place'),
          BottomNavigationBarItem(
              icon: Icon(Icons.leaderboard_rounded), label: 'Leaderboard'),
        ],
        currentIndex: _selectedindex,
        onTap: _onItemTapped,
      ),
    );
  }
}
