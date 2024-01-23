'use client';
const Page = ({}) => {
  const stringOfWords =
    "a ability<br> able<br> about<br> above<br> accept<br> according<br> account<br> across<br> act<br> action<br> activity<br> actually<br> add<br> address<br> administration<br> admit<br> adult<br> affect<br> after<br> again<br> against<br> age<br> agency<br> agent<br> ago<br> agree<br> agreement<br> ahead<br> air<br> all<br> allow<br> almost<br> alone<br> along<br> already<br> also<br> although<br> always<br> American<br> among<br> amount<br> analysis<br> and<br> animal<br> another<br> answer<br> any<br> anyone<br> anything<br> appear<br> apply<br> approach<br> area<br> argue<br> arm<br> around<br> arrive<br> art<br> article<br> artist<br> as<br> ask<br> assume<br> at<br> attack<br> attention<br> attorney<br> audience<br> author<br> authority<br> available<br> avoid<br> away<br> baby<br> back<br> bad<br> bag<br> ball<br> bank<br> bar<br> base<br> be<br> beat<br> beautiful<br> because<br> become<br> bed<br> before<br> begin<br> behavior<br> behind<br> believe<br> benefit<br> best<br> better<br> between<br> beyond<br> big<br> bill<br> billion<br> bit<br> black<br> blood<br> blue<br> board<br> body<br> book<br> born<br> both<br> box<br> boy<br> break<br> bring<br> brother<br> budget<br> build<br> building<br> business<br> but<br> buy<br> by<br> call<br> camera<br> campaign<br> can<br> cancer<br> candidate<br> capital<br> car<br> card<br> care<br> career<br> carry<br> case<br> catch<br> cause<br> cell<br> center<br> central<br> century<br> certain<br> certainly<br> chair<br> challenge<br> chance<br> change<br> character<br> charge<br> check<br> child<br> choice<br> choose<br> church<br> citizen<br> city<br> civil<br> claim<br> class<br> clear<br> clearly<br> close<br> coach<br> cold<br> collection<br> college<br> color<br> come<br> commercial<br> common<br> community<br> company<br> compare<br> computer<br> concern<br> condition<br> conference<br> Congress<br> consider<br> consumer<br> contain<br> continue<br> control<br> cost<br> could<br> country<br> couple<br> course<br> court<br> cover<br> create<br> crime<br> cultural<br> culture<br> cup<br> current<br> customer<br> cut<br> dark<br> data<br> daughter<br> day<br> dead<br> deal<br> death<br> debate<br> decade<br> decide<br> decision<br> deep<br> defense<br> degree<br> Democrat<br> democratic<br> describe<br> design<br> despite<br> detail<br> determine<br> develop<br> development<br> die<br> difference<br> different<br> difficult<br> dinner<br> direction<br> director<br> discover<br> discuss<br> discussion<br> disease<br> do<br> doctor<br> dog<br> door<br> down<br> draw<br> dream<br> drive<br> drop<br> drug<br> during<br> each<br> early<br> east<br> easy<br> eat<br> economic<br> economy<br> edge<br> education<br> effect<br> effort<br> eight<br> either<br> election<br> else<br> employee<br> end<br> energy<br> enjoy<br> enough<br> enter<br> entire<br> environment<br> environmental<br> especially<br> establish<br> even<br> evening<br> event<br> ever<br> every<br> everybody<br> everyone<br> everything<br> evidence<br> exactly<br> example<br> executive<br> exist<br> expect<br> experience<br> expert<br> explain<br> eye<br> face<br> fact<br> factor<br> fail<br> fall<br> family<br> far<br> fast<br> father<br> fear<br> federal<br> feel<br> feeling<br> few<br> field<br> fight<br> figure<br> fill<br> film<br> final<br> finally<br> financial<br> find<br> fine<br> finger<br> finish<br> fire<br> firm<br> first<br> fish<br> five<br> floor<br> fly<br> focus<br> follow<br> food<br> foot<br> for<br> force<br> foreign<br> forget<br> form<br> former<br> forward<br> four<br> free<br> friend<br> from<br> front<br> full<br> fund<br> future<br> game<br> garden<br> gas<br> general<br> generation<br> get<br> girl<br> give<br> glass<br> go<br> goal<br> good<br> government<br> great<br> green<br> ground<br> group<br> grow<br> growth<br> guess<br> gun<br> guy<br> hair<br> half<br> hand<br> hang<br> happen<br> happy<br> hard<br> have<br> he<br> head<br> health<br> hear<br> heart<br> heat<br> heavy<br> help<br> her<br> here<br> herself<br> high<br> him<br> himself<br> his<br> history<br> hit<br> hold<br> home<br> hope<br> hospital<br> hot<br> hotel<br> hour<br> house<br> how<br> however<br> huge<br> human<br> hundred<br> husband<br> I<br> idea<br> identify<br> if<br> image<br> imagine<br> impact<br> important<br> improve<br> in<br> include<br> including<br> increase<br> indeed<br> indicate<br> individual<br> industry<br> information<br> inside<br> instead<br> institution<br> interest<br> interesting<br> international<br> interview<br> into<br> investment<br> involve<br> issue<br> it<br> item<br> its<br> itself<br> job<br> join<br> just<br> keep<br> key<br> kid<br> kill<br> kind<br> kitchen<br> know<br> knowledge<br> land<br> language<br> large<br> last<br> late<br> later<br> laugh<br> law<br> lawyer<br> lay<br> lead<br> leader<br> learn<br> least<br> leave<br> left<br> leg<br> legal<br> less<br> let<br> letter<br> level<br> lie<br> life<br> light<br> like<br> likely<br> line<br> list<br> listen<br> little<br> live<br> local<br> long<br> look<br> lose<br> loss<br> lot<br> love<br> low<br> machine<br> magazine<br> main<br> maintain<br> major<br> majority<br> make<br> man<br> manage<br> management<br> manager<br> many<br> market<br> marriage<br> material<br> matter<br> may<br> maybe<br> me<br> mean<br> measure<br> media<br> medical<br> meet<br> meeting<br> member<br> memory<br> mention<br> message<br> method<br> middle<br> might<br> military<br> million<br> mind<br> minute<br> miss<br> mission<br> model<br> modern<br> moment<br> money<br> month<br> more<br> morning<br> most<br> mother<br> mouth<br> move<br> movement<br> movie<br> Mr<br> Mrs<br> much<br> music<br> must<br> my<br> myself<br> name<br> nation<br> national<br> natural<br> nature<br> near<br> nearly<br> necessary<br> need<br> network<br> never<br> new<br> news<br> newspaper<br> next<br> nice<br> night<br> no<br> none<br> nor<br> north<br> not<br> note<br> nothing<br> notice<br> now<br> n't<br> number<br> occur<br> of<br> off<br> offer<br> office<br> officer<br> official<br> often<br> oh<br> oil<br> ok<br> old<br> on<br> once<br> one<br> only<br> onto<br> open<br> operation<br> opportunity<br> option<br> or<br> order<br> organization<br> other<br> others<br> our<br> out<br> outside<br> over<br> own<br> owner<br> page<br> pain<br> painting<br> paper<br> parent<br> part<br> participant<br> particular<br> particularly<br> partner<br> party<br> pass<br> past<br> patient<br> pattern<br> pay<br> peace<br> people<br> per<br> perform<br> performance<br> perhaps<br> period<br> person<br> personal<br> phone<br> physical<br> pick<br> picture<br> piece<br> place<br> plan<br> plant<br> play<br> player<br> PM<br> point<br> police<br> policy<br> political<br> politics<br> poor<br> popular<br> population<br> position<br> positive<br> possible<br> power<br> practice<br> prepare<br> present<br> president<br> pressure<br> pretty<br> prevent<br> price<br> private<br> probably<br> problem<br> process<br> produce<br> product<br> production<br> professional<br> professor<br> program<br> project<br> property<br> protect<br> prove<br> provide<br> public<br> pull<br> purpose<br> push<br> put<br> quality<br> question<br> quickly<br> quite<br> race<br> radio<br> raise<br> range<br> rate<br> rather<br> reach<br> read<br> ready<br> real<br> reality<br> realize<br> really<br> reason<br> receive<br> recent<br> recently<br> recognize<br> record<br> red<br> reduce<br> reflect<br> region<br> relate<br> relationship<br> religious<br> remain<br> remember<br> remove<br> report<br> represent<br> Republican<br> require<br> research<br> resource<br> respond<br> response<br> responsibility<br> rest<br> result<br> return<br> reveal<br> rich<br> right<br> rise<br> risk<br> road<br> rock<br> role<br> room<br> rule<br> run<br> safe<br> same<br> save<br> say<br> scene<br> school<br> science<br> scientist<br> score<br> sea<br> season<br> seat<br> second<br> section<br> security<br> see<br> seek<br> seem<br> sell<br> send<br> senior<br> sense<br> series<br> serious<br> serve<br> service<br> set<br> seven<br> several<br> sex<br> sexual<br> shake<br> share<br> she<br> shoot<br> short<br> shot<br> should<br> shoulder<br> show<br> side<br> sign<br> significant<br> similar<br> simple<br> simply<br> since<br> sing<br> single<br> sister<br> sit<br> site<br> situation<br> six<br> size<br> skill<br> skin<br> small<br> smile<br> so<br> social<br> society<br> soldier<br> some<br> somebody<br> someone<br> something<br> sometimes<br> son<br> song<br> soon<br> sort<br> sound<br> source<br> south<br> southern<br> space<br> speak<br> special<br> specific<br> speech<br> spend<br> sport<br> spring<br> staff<br> stage<br> stand<br> standard<br> star<br> start<br> state<br> statement<br> station<br> stay<br> step<br> still<br> stock<br> stop<br> store<br> story<br> strategy<br> street<br> strong<br> structure<br> student<br> study<br> stuff<br> style<br> subject<br> success<br> successful<br> such<br> suddenly<br> suffer<br> suggest<br> summer<br> support<br> sure<br> surface<br> system<br> table<br> take<br> talk<br> task<br> tax<br> teach<br> teacher<br> team<br> technology<br> television<br> tell<br> ten<br> tend<br> term<br> test<br> than<br> thank<br> that<br> the<br> their<br> them<br> themselves<br> then<br> theory<br> there<br> these<br> they<br> thing<br> think<br> third<br> this<br> those<br> though<br> thought<br> thousand<br> threat<br> three<br> through<br> throughout<br> throw<br> thus<br> time<br> to<br> today<br> together<br> tonight<br> too<br> top<br> total<br> tough<br> toward<br> town<br> trade<br> traditional<br> training<br> travel<br> treat<br> treatment<br> tree<br> trial<br> trip<br> trouble<br> true<br> truth<br> try<br> turn<br> TV<br> two<br> type<br> under<br> understand<br> unit<br> until<br> up<br> upon<br> us<br> use<br> usually<br> value<br> various<br> very<br> victim<br> view<br> violence<br> visit<br> voice<br> vote<br> wait<br> walk<br> wall<br> want<br> war<br> watch<br> water<br> way<br> we<br> weapon<br> wear<br> week<br> weight<br> well<br> west<br> western<br> what<br> whatever<br> when<br> where<br> whether<br> which<br> while<br> white<br> who<br> whole<br> whom<br> whose<br> why<br> wide<br> wife<br> will<br> win<br> wind<br> window<br> wish<br> with<br> within<br> without<br> woman<br> wonder<br> word<br> work<br> worker<br> world<br> worry<br> would<br> write<br> writer<br> wrong<br> yard<br> yeah<br> year<br> yes<br> yet<br> you<br> young<br> your<br> yourself";

  const words =
    'security family everything effect three never memory positive rise high book consider source nice enjoy face message daughter evidence suggest trade nature dog responsibility let sport bag dead sit candidate lay next method death sister million one service art game fish her especially but stay station size him rate weight career director despite section again also third room near more there along wind the shoulder lay next method death sister million one service art game fish her especially but stay station size him rate weight career director despite section again daughter ago each city tend on country degree total rock protect baby there along wind the shoulder lay next method death sister million one service art game fish her especially wind daughter ago each city tend on country degree total rock protect baby there along the shoulder lay next method death sister million one service art game fish her especially city tend on country degree total rock protect baby there along wind the shoulder lay next method death sister million one service art game fish her especially but stay station tend on country degree total rock protect baby there along wind the shoulder lay next method death sister million one service art game fish her especially but stay station size';

  const wordsArray = words.split(' ');

  function getUniqueWords(wordsArray) {
    return Array.from(new Set(wordsArray));
  }

  function extractWords(str) {
    return str.split('<br> ').filter(word => word.trim() !== '');
  }

  const filteredArray = extractWords(stringOfWords);

  function randomSelect(words, count, seed) {
    let indices = [];
    let rng = () => Math.abs((Math.sin(seed++) * 10000) % 1) * words.length;

    for (let i = 0; i < count; i++) {
      let index = Math.floor(rng());
      while (indices.includes(index)) {
        index = Math.floor(rng());
      }
      indices.push(index);
    }

    return indices.map(i => words[i]);
  }

  function generateTableRows(words) {
    return Array.from({length: 5}, (_, rowIndex) => (
      <tr key={rowIndex} className="border border-gray-200">
        {words.slice(rowIndex * 6, (rowIndex + 1) * 6).map((word, colIndex) => (
          <td key={colIndex} className="px-2 py-2 border border-gray-200 text-center">
            {word}
          </td>
        ))}
      </tr>
    ));
  }

  const tableRows1 = generateTableRows(randomSelect(filteredArray, 30, 50));
  const tableRows2 = generateTableRows(randomSelect(filteredArray, 30, 20));
  const tableRows3 = generateTableRows(randomSelect(filteredArray, 30, 15));
  const tableRows4 = generateTableRows(randomSelect(filteredArray, 30, 3));
  const tableRows5 = generateTableRows(randomSelect(filteredArray, 30, 2));
  const tableRows6 = generateTableRows(randomSelect(filteredArray, 30, 6));
  const tableRows7 = generateTableRows(randomSelect(filteredArray, 30, 7));

  function generateTableRows(words) {
    const numRows = Math.ceil(words.length / 6);
    return Array.from({length: numRows}, (_, rowIndex) => (
      <tr key={rowIndex} className="border border-gray-200">
        {words.slice(rowIndex * 6, (rowIndex + 1) * 6).map((word, colIndex) => (
          <td key={colIndex} className="px-2 py-2 border border-gray-200 text-center">
            {word}
          </td>
        ))}
      </tr>
    ));
  }

  const uniqueWords = getUniqueWords([
    ...randomSelect(filteredArray, 30, 50),
    ...randomSelect(filteredArray, 30, 20),
    ...randomSelect(filteredArray, 30, 15),
    ...randomSelect(filteredArray, 30, 3),
    ...randomSelect(filteredArray, 30, 2),
    ...randomSelect(filteredArray, 30, 6),
    ...randomSelect(filteredArray, 30, 7),
  ]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <table className="w-full text-left border-collapse my-4">
        <tbody>{tableRows1}</tbody>
      </table>
      <table className="w-full text-left border-collapse my-4">
        <tbody>{tableRows2}</tbody>
      </table>
      <table className="w-full text-left border-collapse my-4">
        <tbody>{tableRows3}</tbody>
      </table>
      <table className="w-full text-left border-collapse my-4">
        <tbody>{tableRows4}</tbody>
      </table>
      <table className="w-full text-left border-collapse my-4">
        <tbody>{tableRows5}</tbody>
      </table>
      <table className="w-full text-left border-collapse my-4">
        <tbody>{tableRows6}</tbody>
      </table>
      <table className="w-full text-left border-collapse my-4">
        <tbody>{tableRows7}</tbody>
      </table>
      <div>
        <table className="w-full text-left border-collapse my-4">
          <tbody>{generateTableRows(uniqueWords)}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
