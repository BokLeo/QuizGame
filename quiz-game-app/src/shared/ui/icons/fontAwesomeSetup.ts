import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSyncAlt,
  faPlus,
  faMinus,
  faAnglesLeft,
  faAnglesRight, // ✅ 추가
} from "@fortawesome/free-solid-svg-icons";

// 아이콘을 FontAwesome 라이브러리에 추가
library.add(faSyncAlt, faPlus, faMinus, faAnglesLeft, faAnglesRight);
