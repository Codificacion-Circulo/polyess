class Wins {
  final String? gameid;

  Wins({this.gameid});

  factory Wins.fromJson(Map<String, dynamic> json) {
    return Wins(
      gameid: json['gameId'],
    );
  }
}

class WinsList {
  final List<Wins>? wins;

  WinsList({this.wins});

  factory WinsList.fromJson(List<dynamic> json) {
    final winsList = json.map((i) => Wins.fromJson(i)).toList();
    return WinsList(
      wins: winsList,
    );
  }
}
