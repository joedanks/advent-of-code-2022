import * as fs from "fs";
import { partOne, partTwo } from "./code";

const realInput = "mgwwjddqzqdqsstctjjsdjsdsrsfsmfsfwwltwlwhwnhhlffzddgffwlffbsfshfshhgvvdrrltlzlnzznrrnrsnnhgnnfjnnvpnnbjjnwwrcwrrhlhvlhhmzmqzqrqtqmqpmpwwmssgsrgrgtgmtgmtgtdtvdvmvsvsbvsbvbtthmmftmmdnmddcrcvcrrfjfhhfjhffjllcpllmcctjtrttwmtwmwffrlrqlqzzpddsqdqqgjqgjgngwnncjnnvsnswwbzbtzzflzzqsqbsbvbmbnnjpnpnnpfpmpmnpmmjljtltssqnsqslstswtwswwjddvmmzlzqlzqzqjjlttmtrtbtmtgmtmsttrctrrsqrqvvrzrcrhhlnhllbfbtthrhdhllmwlmlgglgsgmgsmszzprpwpfprfftffpssjzjgzjzddqfqmmwqwvwlvlqqtbtwwrwttmsmppbmmpcmctcnnhssnjncnlcnctcjjrzrwrfwfcwffczztrtsrtstlsssljssmvssjzssrqqrcqqwlqwlwffsflssrrzhzzhrzzdgdppspwplpqptttvddggzszccrrnzzwwdwjddrvvwggpvgpvvhdhqddffrnngcncjcjlcchrrftrrjccrcrqqgcglcgcscmmlzmmtcmcffwfcfrcrggdmggdvvnrvnnphnngzzpdpgpspqqgrrnffmfpmffmgfmmjmzztlljlggljjcnnrqnqpnqndnffnwwbpwpjwjjlslmsmtmtjttsvsggrmmdpmmcjjswsqqwfwwrwffczfzggqvggdlldhllsdsfdsdhhmmzmjjmpjpddsccqrrjhjlhjjcnnpwnnffjwwcsszrrnmnsmnnjbnndwnnnhnwwjtwtlwtwqqbnqnbnqqfjfdjdbbwbqwqpqggbcbhhtrtqrrddpdwdlwdddzvzwvvdfdpdcdvdtdpttwwdzdzmdmqmzmnzmnmhmwmjwwshhcqcpcvvzgzdggnjnnhwnhhswwvccqrqlqggcngnmggmffblbglltlstshhrjjlvlppsqslljtjtgglvltvlvmllhrhdrrmqrmqmjjdcjjppqwwllvsvsrszslsvvghvvhmmfbfvfpfmmvdvppwggtrrjvvsbbzffbmffpqqqhnhncclzczwcwpwssrprfrsrbsbnbvnnwzwqqpsqsspmssztssstrtcczsznzvvpvttnssdjdhjddngdgvvmsszbzsbsmbbgsbgsgmmhwhghrhjhphshchgglmlvlhlbhlldwdggdsscvcbcssfbbvggvwwtstltrrwttjdtdvttlsttfhfmhhcbclbcbffqqslshlldhdqhhjwwlffrbrdbrrgcrrfmffbhhlslrslrslrlsrsnsnvvqfqnnfdfmfmttmcmcrrcmmmjttjvtvvjbjqjnnbtbnblbtlblplgltlqltlztzvvtdvvtpvvwdwfflbflfrrhbrbbmjmcjmccztzwwjzwwzwdzdnnwcclbllqgghjhlhthwrdglrmcpbmtrnrdtvjrpmzqmljzzrtpzsrhnjrsdmpnsgdhvqchcfqjqdncjqfnscwjqvszpzzfhpjljmvsqnjzmrsgsbzlvrddtdmwbwwgprlvdfflrpztdzrhtmlzrrtdmpmcprqzzwlnmfjvsrltfjgcnnfllnzmbjcbthvbffczsspmczrpgpdjmvrvfmprfmnqdcnfwwvgdrwvrbtlqmhrrjvtrmmgrlprtnzdlszgbtbwztdrmpmlfblshzcnsczlblgwzrpnlccwhmcqhssmpznbdnnqgzzmjprjttdjhmjbmgqvzblsjwmplzsthrswhsdbvtqgrfzmbpqtpqgqdqcvzlgjrtvrhvzgmcmrwdmfpdvjddsmmsnvrdgnsbsdzcbprbqchqcgnwmfsrmqtrcdhdtzztbvmpblftwqlmlmmjcjhhjlgnnhljnncvbnjhgbjrltlwscswgvqmcnssbcdrtbgnhgmpmvjwtrbrbrdbdqfrncvhdstwztwcpbjrjwzmdlwvlvmsrhghjwjnjstbcqjqtjrgcvhzjdhdgbgdlhvjmztwvhgzzggwwhhhzvtrldchztmwfjvnqnvhnwpfvzzvnlvsccmvsngzgtnttssmdmhwzlhtpnfhczsdfnrstbwvwpqmslcvpvhfzttzhsgzpbhqdtswshljpncznjhzmgvvbcllmzprhrvwljwcjpcdqmwbzvsdcgtmwnrhswsgqhwpwhbjpnhnpjvgsqcjltzrqvqfflcdcvpwnznvtqbfbtlpmtdgbbwdwncqsqnbtgfdzzqzzvjnwmzdmlgstmnjwznjqghglvmwjzlqrnddcqhgndlhlbmqdhrqgrjqztnhpzssnwmrqclmwpgbvfrvgqqvtthznsqwgndjrprbgrhcvhpzbfhdmgnhsrqjvjstbtmnltsbjfzczvjqnhtldqclsflbhvvlzjwrqqgbgpwqwpfjctqpzdqwcfstmwbzgrgrtzngljjnvtggrqcbgjwtqsdgwmfjqppnzgfsfdmlctztbhnntnntdlvrsdvnllvmpggjzspqfhzwrttwzpqrnqjhmpjnmrzrpnqzshcqgctbtflqflcrzpmnphgbbghhwzplljwngbtffwmrwggdztvtfgwldlswqvjptvbfvnbpglhgrdgcfmvrslqldmwjqvjpvwgpjddvglllvpqwvbchqsmjrncgvgmqbsbcwfbsbpqcqzjfpcdzszgmvqgqjlflpfzbsrhsrzrdbpssrjbcfhvztftlzqpsglpwhbscgwdlbgghzsbwznnbgnnsgjghmmpmmrmqmdhnflgvgprqfcbpzbcpjscvnpfrmtvzsbflmffvcfsvdsggzdqtppcjzphcqwrqtrczqmwcdmdqndzmhdpnfqsbndnvjlzrsjzmpcrfgjwccsdtzvslccwhlvzjwjgvwpsnsggmqgsjfbwmjstsgnqmtjhljvfnflnngdrqvscwlqqdsglhghczhjdvgrjcqblmncdbjvsbwgptgpvvzhcjgjnvttrgzrjnqlvfbrmpzdcbbnnrqptpzpssznbsrstdphbgdrsnrhcjwwgsncdzvqfnmnvqcmcgdgjdbqjzdrvvbvhjdfcqndmqwscmsvppclzrhgbldqtwctbdhpbbwfvwpcpsvddmrhqbhlrrmrblnmqqqbwvcwwbwprlmhtdncmjhmjgphmrrhcdrqgmcrzwsznqzpngbtsvjgglrddhjflbrhvqwmmhmqzhphwnvqwzczdvqjsnlhfqbcgddtwgnlcgbfqmzfpqmnbpvfhdhjlnwtrlmggtbfnfvmqrzjvjjvffctsrwgfcpghhnzqmwtlsfhjrvqpwqhngrhpswslsvtgnbvbmwsfwmpntfsfpshrjzvghhpvnlbmnrhltfpmqdwzfhztvhlmbnmhnbvdzbbtczvwbvwtvjghhjjrtgbrqrhmbgvssstdwztdmdsqtctghjhsnpslqttdlvndmjfnmdzwrblfjqcwptfttvlcgsvwcbmfzbdlmrtchgqlfspwznbzfjthjtfwshqgfsfdsmzsmpptzschlzjshvfwtmpszvrvlggbrgpcnqwndhjjprztdfddblhfljbvttfvhchhdfsftrhccrbncmhwpcpwfqthngcqptmvsmpcswdrdlcbqvvhwmcqqwbzlblrgfcrrndwdvlvnpjvwchzjzmgrqhzzmgqqdsdflpclpdtlhvhcthzjfbvjvzsnbvwfsnglvbnwnbgrqwpbgclhjhztttbjwvmlmmgmzncbwswncqhmcfjfnwnpbrmchhpgwngrfwgdfdqmblwlghdjvdhjftdblrtcvvgbvpmbjhfwgpmghqbqrcpgfvhtvqtlbjdblggcpjzlrhpbsqwntfhbhwwszpdlsgbpfqhvrjrhsldcgvqhqmwdfcrcmhrvvwvbrfsrrcvwzhqqvgltlnhwhdrhrdqsvmdzjwgmqdsccwhcgwltfhdfqpsltjccwsttmrc";

describe.skip("Part 1", () => {
  it("should pass test input", () => {
    expect(partOne("bvwbjplbgvbhsrlpgdmjqwftvncz")).toBe(5);
    expect(partOne("nppdvjthqldpwncqszvftbrmjlhg")).toBe(6);
    expect(partOne("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg")).toBe(10);
    expect(partOne("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw")).toBe(11);
  });

  it("should run real input", () => {
    expect(partOne(realInput)).toBe(1544);
  });
});

describe.skip("Part 2", () => {
  it("should pass test input", () => {
    expect(partTwo("mjqjpqmgbljsphdztnvjfqwrcgsmlb")).toBe(19);
    expect(partTwo("bvwbjplbgvbhsrlpgdmjqwftvncz")).toBe(23);
    expect(partTwo("nppdvjthqldpwncqszvftbrmjlhg")).toBe(23);
    expect(partTwo("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg")).toBe(29);
    expect(partTwo("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw")).toBe(26);
  });

  it("should run real input", () => {
    expect(partTwo(realInput)).toBe(2145);
  });
});
