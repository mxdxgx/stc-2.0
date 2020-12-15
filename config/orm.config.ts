import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { Character } from "../src/entities/Character";
import { Dialog } from "../src/entities/Dialog";
import { Dimension } from "../src/entities/Dimension";
import { Episode } from "../src/entities/Episode";
import { Firepower } from "../src/entities/Firepower";
import { Job } from "../src/entities/Job";
import { Movie } from "../src/entities/Movie";
import { Organization } from "../src/entities/Organization";
import { Planet } from "../src/entities/Planet";
import { Quality } from "../src/entities/Quality";
import { Race } from "../src/entities/Race";
import { Rank } from "../src/entities/Rank";
import { Serie } from "../src/entities/Serie";
import { Speed } from "../src/entities/Speed";
import { Unit } from "../src/entities/Unit";
import { Vessel } from "../src/entities/Vessel";
import { Vesselspecification } from "../src/entities/Vesselspecification";
import { Vesseltype } from "../src/entities/Vesseltype";
import { Weapon } from "../src/entities/Weapon";
import { Weaponmode } from "../src/entities/Weaponmode";
import { Weapontype } from "../src/entities/Weapontype";
import { configs } from "./configs";
import { constants } from "../src/utils/constants";

const typeOrmConfig: PostgresConnectionOptions = {
  type: configs.typeOrm.type,
  host: configs.typeOrm.host,
  port: configs.typeOrm.port,
  username: configs.typeOrm.username,
  password: configs.typeOrm.password,
  database: configs.typeOrm.database,
  synchronize: true, //constants.SYNC_DB,
  logging: constants.IS_DEVELOPMENT,
  entities: [
    Character,
    Dialog,
    Dimension,
    Episode,
    Firepower,
    Job,
    Movie,
    Organization,
    Planet,
    Quality,
    Race,
    Rank,
    Serie,
    Speed,
    Unit,
    Vessel,
    Vesselspecification,
    Vesseltype,
    Weapon,
    Weaponmode,
    Weapontype,
  ],
};

export { typeOrmConfig };
