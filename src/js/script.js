// 1. Impor fungsi inti dari library
import { library, dom } from "@fortawesome/fontawesome-svg-core";

// 2. Impor ikon-ikon spesifik yang ingin Anda gunakan
import { faUser, faCog, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

// 3. Tambahkan ikon-ikon tersebut ke dalam "library" Anda
library.add(faUser, faCog, faSpinner, faGithub);

// 4. Perintahkan Font Awesome untuk memantau perubahan DOM
//    dan secara otomatis mengganti tag <i> dengan ikon SVG.
dom.watch();
