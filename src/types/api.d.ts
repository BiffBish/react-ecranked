declare namespace Api {
  interface LeaderboardPositions {
    total_games: number;
  }

  type Achievements = {
    0: number;
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
    8: number;
    9: number;
    10: number;
    11: number;
    12: number;
    13: number;
    14: number;
    15: number;
    16: number;
    17: number;
    18: number;
    19: number;
    20: number;
    21: number;
    22: number;
    23: number;
    24: number;
    25: number;
    26: number;
    27: number;
    28: number;
    29: number;
    30: number;
    31: number;
    32: number;
    33: number;
    34: number;
    35: number;
    36: number;
    37: number;
    38: number;
    39: number;
    40: number;
    41: number;
    42: number;
    43: number;
    44: number;
    45: number;
    46: number;
    47: number;
    48: number;
    49: number;
    50: number;
    51: number;
    52: number;
    53: number;
    54: number;
    55: number;
    56: number;
    57: number;
    58: number;
    59: number;
    60: number;
    61: number;
    62: number;
    63: number;
    64: number;
    65: number;
    66: number;
    67: number;
    68: number;
    69: number;
    70: number;
    71: number;
    72: number;
    73: number;
    74: number;
    75: number;
    76: number;
    77: number;
    78: number;
    79: number;
    80: number;
  };

  type Stats = {
    average_speed: number;
    average_ping: number;
    percent_stopped: number;
    percent_upsidedown: number;
    total_games: number;
    payload_games: number;
    capture_games: number;
    deaths: number;
    top_speed: number;
    dyson_games: number;
    combustion_games: number;
    fission_games: number;
    surge_games: number;
    average_deaths: number;
    percent_crash: number;
    percent_left: number;
    percent_right: number;
    percent_close_mate: number;
    percent_close_enemy: number;
    total_seconds: number;
    // leaderboard_positions: LeaderboardPositions;
    top_loadout: [string, number][];
    loadout: { [key: string]: number };
  };
  type User = {
    oculus_id: string;
    oculus_name: string;
    discord_id: string | null;
    discord_name: string | null;
    about_string: string | null;
    level: number;
    moderator: boolean;
    avatar_hash: string | null;
    avatar_extension: string | null;
    avatar_approved: boolean;
    join_date: number | null;
    contacted: boolean;
    heatmap_completed: boolean | null;
    heatmap_render_date: number | null;

    team_id: number | null;
    requested_team_id: number | null;

    stats: Stats | null;
    daily_stats: Stats | null;
    weekly_stats: Stats | null;
    monthly_stats: Stats | null;
    achievement_stats: Stats | null;

    achievements: Achievements | null;

    avatar: string | null;
  };

  declare namespace User {
    type All = string[];
  }

  // Generated by https://quicktype.io

  type Team = {
    id: number;
    name: string;
    description: string;
    admin_id: string;
    join_date: number | null;
    users: Team_User[];
    requesting_users: Team_User[];
    verified: boolean;
  };

  type Team_User = {
    oculus_name: string;
    oculus_id: string;
  };

  declare namespace Team {
    type SimpleTeam = {
      name: string;
      id: number;
      member_count: number;
      requesting_count: number;
    };
    type All = SimpleTeam[];
  }
}