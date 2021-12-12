class Loses {
  final String? gameid;

  Loses({this.gameid});

  factory Loses.fromJson(Map<String, dynamic> json) {
    return Loses(
      gameid: json['gameId'],
    );
  }
}

class LossList {
  final List<Loses>? loses;

  LossList({this.loses});

  factory LossList.fromJson(List<dynamic> json) {
    final lossList = json.map((i) => Loses.fromJson(i)).toList();
    return LossList(
      loses: lossList,
    );
  }
}
