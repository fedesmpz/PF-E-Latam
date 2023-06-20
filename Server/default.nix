with (import <nixpkgs> {});

let
  nodejsDeps = buildNodejsPackage {
    name = "api";
    version = "1.0.0";
    src = ./.;
    nodeEnv = with nodejsPackages; [
      axios
      bcrypt
      body-parser
      cookie-parser
      cors
      dotenv
      express
      jsonwebtoken
      morgan
      pg
      sequelize
    ];
  };

in nodejsDeps.env
