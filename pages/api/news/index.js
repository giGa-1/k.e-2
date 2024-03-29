const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const cache = new Map();

export default function handle(req, res) {
    if(isNaN(req.query.page) || req.query.page < 1) {
        res.status(400).json({err: "invalid page!"});
        return;
    }
    let num = (req.query.page - 1) * 20;

    if(cache.has(num)) {
        let c = cache.get(num);
        if(new Date().valueOf() - c.date.valueOf() < 6000 * 1000) {
            console.log("fetched news from cache");
            res.status(200).json(c.value);
            return;
        }
    }

    return new Promise((resolve, reject) => {
        fetch(`https://kg-portal.ru/news/movies/${num}/`, {
            method: 'GET',
        }).catch(err => {
        }).then(resp => {
            if(resp != undefined) {
                resp.text().then(text => {
                    const { document } = (new JSDOM(text)).window;
                    let collection = document.getElementsByClassName("news_box movies_cat");
                    let promises = [];
                    for (let i = 0; i < collection.length; i++) {
                        promises[i] = getData(collection.item(i).getElementsByTagName("a")[0].href);
                    }
                    Promise.all(promises).then((values) => {
                        cache.set(num, {date: new Date(), value: values});
                        
                        console.log("fetched news from web");
                        res.status(200).json(values);
                        resolve();
                    });
                })
            } else {
                res.status(200).json([
                    {
                      title: '«Это всё, что вы хотите от кино» — рецензия на «Флэша» от Тома Круза',
                      text: 'Кажется, нас ждёт первый по-настоящему крутой фильм DC со времён «Тёмного рыцаря» Кристофера Нолана. Речь, разумеется, о «Флэше» Энди Мускетти, ради которого вылечили даже Эзру Миллера. Первые восторженные отзывы прилетели с тестовых показов, и чем дальше, тем больше их становилось.А теперь своё веское слово сказал сам Том Круз, чей авторитет в мире кинематографа вырос до небывалых высот после прошлогоднего успеха «Топ Гана: Мэверика», буквально поднявшего с колен кинотеатральный прокат. Говорят, актёру так понравился «Флэш», что он тут же позвонил режиссёру выразить свой восторг.По информации инсайдеров, в конце февраля актёр встречался с Дэвидом Заславом, в ходе которой президент Warner Bros. Discovery как бы невзначай упомянул, насколько великолепный фильм удалось снять. Тогда-то Круз, чьё любопытство было возбуждено, и «выпросил» себе копию для просмотра. Сотрудник студии доставил её актёру прямо домой и оставался там, пока тот не закончил.«Флэш» — это всё, что вы хотите от кино, и именно тот фильм, который вам сейчас нужен: как прознали вездесущие инсайдеры, примерно такими словами Том Круз описал свои впечатления от увиденного.',
                      coverUrl: 'https://kg-portal.ru/img/114342/main.jpg',
                      date: '2023-03-20T18:18:00+03:00'
                    },
                    {
                      title: 'Телеовощи. Выпуск 488: Очень не очень',
                      text: '',
                      coverUrl: '',
                      date: '2023-03-20T16:26:00+03:00'
                    },
                    {
                      title: 'Восточный супергерой Ходжа Насреддин: Тимур Бекмамбетов скоро приступит к режиссуре своего мультфильма',
                      text: 'Режиссёр и продюсер Тимур Бекмамбетов обеспечил поддержку турецких партнёров для производства своего анимационного полнометражного фильма про легендарного ближневосточного фольклорного персонажа Ходжа Насреддина.Bazelevs подписал договор с Yeni Dusler Animation — производственной компанией и контент провайдером для национальных теле и радиовещателей Turkish Radio и Television Corporation.Англоязычный мультфильм станет первым режиссёрским опытом Бекмамбетова в анимации. Премьера запланирована на 2024 год. Актёров озвучки собираются анонсировать в ближайшее время.Насреддин — путешествующий философ и трикстер, который попадает в ситуации разной степени тяжести и абсурдности, чтобы всенепременно выпутаться с помощью хитрости, мудрости и юмора.Бекмамбетов объясняет, как охватит все кинорынки:Для народов Ближнего Востока и Азии Насреддин практически супергерой. В этих частях мира его знают под разными именами, но в каждой стране он национальный герой. В Казахстане его знают как Алдара Косе, в Турции он Ходжа, в Арабских странах — Джоха и Афанти в Китае.Тимур ждёт участия со стороны участников из всех упомянутых стран.',
                      coverUrl: 'https://kg-portal.ru/img/114337/main.jpg',
                      date: '2023-03-20T15:48:00+03:00'
                    },
                    {
                      title: 'Сиквел «Смерча» раскручивает актрису Дэйзи Эдгар-Джонс на съёмки в главной роли',
                      text: 'Дэйзи Эдгар-Джонс («Там, где раки поют») активно переговаривается насчёт участия в «Смерчах» — продолжении приключенческого фильма 1996 года от Universal Pictures и Amblin Entertainment.Ли Айзек Чун («Минари») режиссирует кино по сценарию Марка Л. Смита («Выживший»).Фрэнк Маршалл продюсирует постановку через свою контору Kennedy/Marshall Company. Его жена и президент Lucasfilm Кэтлин Кеннеди была ведущим продюсером первого фильма.Оригинальный «Смерч» рассказывал, как персонажи Хелен Хант и Билла Пэкстона, парочка охотников за торнадо со сложными романтическими отношениями, вынуждены столкнуться с суровым атмосферным явлением и разобраться в своих чувствах друг к другу.Кино поставил режиссёр Ян де Бонт; по миру удалось собрать $ 500 млн.Новый фильм не станет прямым сиквелом и старых героев возвращать не собираются. Студия называет проект «следующей главой».Эдгар-Джонс сыграет бывшую охотницу, которая едва пережила чудовищное столкновение с торнадо и теперь работает в офисе. Но какие-то причины, разумеется, вынуждают её опять взяться за старое.',
                      coverUrl: 'https://kg-portal.ru/img/114328/main.jpg',
                      date: '2023-03-20T10:59:00+03:00'
                    },
                    {
                      title: 'Слили всех динозавров! Режиссёры «65» сильно недовольны маркетингом студии Sony',
                      text: 'У студии Sony есть неприятная репутация чересчур агрессивно рекламировать свои фильмы, показывая всё самое интересное в трейлерах. С этим столкнулись режиссёры экшен-триллера «65» Скотт Бек и Брайан Вудс.Картина с Адамом Драйвером в главной роли рассказывала о том, как пилот космического корабля оказывается на доисторической Земле и вынужден выживать в суровых условиях в очень враждебной атмосфере. Последнюю обеспечивают категорически негостеприимные динозавры.И вот такой поворот: динозавры должны были быть большим сюрпризом.Бек объясняет:Наш питч да и сам сценарий раскрывает основную фишку на 15 или 20 минуте. Мы говорили об этом с самого начала, но также динозавры — самая привлекающая часть ленты. Но мы специально снимали так, чтобы наши динозавры не утекли в интернет раньше положенного.Верим, что в перспективе будут зрители, которых не коснулся маркетинг. Надеемся, они приятно удивятся.«65» стоил студии $ 45 млн и на сегодняшний день заработал по миру $ 38,8 млн. Даже полное раскрытие динозавров не сильно помогло кассе.',
                      coverUrl: 'https://kg-portal.ru/img/114329/main.jpg',
                      date: '2023-03-20T09:54:00+03:00'
                    },
                    {
                      title: 'Чудо-женщина на свежем архивном фото Зака Снайдера зовёт на поиски приключений (фото)',
                      text: 'Таинственные анонсы от Зака Снайдера ожидаемо продолжаются. Вслед за сообщениями с портретами Супермена и Бэтмена пожаловал пост с Чудо-женщиной по версии Снайдера. Как известно, постановщик, выбравший на эту роль Галь Гадот, видел главную амазонку мира DC более жёсткой и воинственной, чем ту, которую мы видели в фильмах Пэтти Дженкинс.\n' +
                        '\n' +
                        'Фото Чудо-женщины времён Крымской кампании из архивных закромов Зака Снайдера сопровождается надписью, комментирующей сакраментальное путешествие героя, который отправляется навстречу неизведанному, оставляя за плечами знакомый мир. В этом путешествии герой преодолеет все препятствия, переживёт трансформацию и вернётся в знакомый мир, приобретя бесценное личное сокровище — опыт.Из очевидного: завтра можно ожидать очередной пост — с Акваменом, Флэшем или Киборгом.',
                      coverUrl: '',
                      date: '2023-03-19T23:44:00+03:00'
                    },
                    {
                      title: 'Новые фильмы недели: «Джон Уик 4», неправильные «Три мушкетёра» и другие новинки кино',
                      text: 'В списке новых релизов есть лишь один достойный кандидат, и воцариться в отечественном прокате ему ничто не помешает. На российские киноэкраны выходит экшен-триллер «Джон Уик 4» с Киану Ривзом. Остатками зрительского внимания будет перебиваться в плохом смысле пародия на приключенческое кино «Три мушкетёра» Нет, не французские «Три мушкетёра». На цифре меж тем выходит триллер Шьямалана «Стук в хижине».А всё ведь начиналось достаточно безобидно — человек, потерявший жену и лишившийся её последнего подарка — собаки, мстит обидчикам, которые лишили его шанса на нормальную человеческую скорбь. И вынудили Вернуться!Как говорится, с этого начинали. А что происходит сейчас?Экскомьюникадо Джон Уик бросает вызов какому-то совету старейших, чтобы в сватке один на один с персонажем Билла Скарсгарда таки добиться свободы от скрытого мира ассасинов с их специфическими гостиницами и собственной валютой.Всё стало очень сложно. Но самое главное — на это можно не обращать внимания. А просто смотреть, как Киану Ривз, превозмогая свой возраст, раздаёт люли каким-то непостижимым образом.В «Джона Уика 4»  добавлен вкус азиатской кухни с нунчаками и Донни Йеном. Если верить первым отзывам, четвёртый фильм улетает в заоблачные выси по части экшена. И в это легко поверить.М. Найт Шьямалан решил удивить всех фильмом с предсказуемым финалом. Что-то в этом, конечно, есть. Учитывая его репутацию. Впрочем, думаем, не все смогут оценить эту иронию высокого полёта. Всё-таки иногда полезно идти на поводу у ожиданий, даже когда сильно не хочется.«Стук в хижине» рассказывает, как семья — два отца и их приёмная дочка — встречает группу мутных персонажей, которые хотят остановить апокалипсис. Только для этого одному из членов семьи придётся принести в жертву другого. Совершенно добровольно. Есть, конечно, в сюжете интересное решение: вторгающиеся злодеи совсем не злодеи и тоже на грани нервного срыва.Саспенс присутствует, но ровно до того момента, когда исчезает любая двусмысленность. А это происходит достаточно быстро. Зато все сыграли отлично, особенно Дэйв Батиста.Понимаете, в мире слишком мало постановок «Трёх мушкетёров». Срочно требуется ещё одна. Зачем она и почему она — неизвестно. Но она есть, и отечественный прокатчик загорелся идеей показать её нашим зрителям.Главное «достижение» этой постановки — чернокожий гасконец Д’Артаньян. Кажется, больше ничего эдакого очередная современная интерпретация приключенческой классики предложить не сможет.Полный список новинок кино смотрите в нашем календаре премьер.',
                      coverUrl: '',
                      date: '2023-03-19T23:04:00+03:00'
                    },
                    {
                      title: 'Режиссёр «Шазама 2» прокомментировал кассовый провал фильма',
                      text: '«Шазам 2» провалился в прокате, едва успев туда попасть: $ 65 млн по миру за первый уик-энд при бюджете в $ 110 млн — явно не то, на что до недавнего времени мог рассчитывать даже самый скромный фильм по комиксам. Но вряд ли это кого-то удивило — Джеймс Ганн собрался перезапускать DC-вселенную, где больше нет места старым героям, а, значит, нет смысла тратиться и на их продвижение.Не оказался застигнутым врасплох и режиссёр сиквела Дэвид Ф. Сандберг, который соответствующие выводы сделал давно и ожидал чего-то подобного:Не беспокойтесь. Не то чтобы это стало сюрпризом. Я давно понял, к чему всё идёт. Впрочем, я буду в порядке — хорошо, что мне заплатили вперёд.Фанаты характерный юмор постановщика не оценили, и тому пришлось оправдываться. Нет, он не считает сиквел «Шазама» плохим и вообще не имел в виду ничего конкретного — просто шутки шутил.Я не имел в виду ничего такого — только то, что понимал, какими примерно будут сборы. Комментарий про оплату — это я просто попытался быть дерзким.Триквела, похоже, уже не будет, а ведь так бодро всё начиналось.',
                      coverUrl: 'https://kg-portal.ru/img/114323/main.jpg',
                      date: '2023-03-19T22:39:00+03:00'
                    },
                    {},
                    {
                      title: '«Шазам! 2» сломался в прокате — нового уже не принесут',
                      text: 'Ярость богов в случае «Шазама! 2» проявила себя в кассовой неудаче; божественного вмешательства не случилось — сиквел заработал на старте в домашнем прокате $ 30,5 млн. При этом оригинальная часть в премьерные дни оприходовала $ 53,5 млн.Так плохо дисишные фильмы выступали только во время пандемии с гибридными релизами вроде «Отряда самоубийц 2» и «Чудо-женщины 1984» — $ 26,2 млн и $ 16,7 млн.Международная касса добавила $ 35 млн, сиквел совсем не приглянулся китайскому прокату, где добыл $ 4,4 млн.Бюджет у кинокомикса по меньшей мере $ 110 млн без трат на продвижение.На втором месте стоит «Крик 6», добавивший за второй уик-энд $ 17,5 млн. По миру у слэшера уже больше ста миллионов — $ 116 млн ($ 76 млн с домашних показов и $ 40 с остальных рынков). Предыдущая часть собрала за всё время $ 137 млн.Тройку замыкает «Крид 3» с $ 224 млн мировых. Триквел обогнал оригинал и первое продолжение — $173 млн $ 214 млн.',
                      coverUrl: 'https://kg-portal.ru/img/114320/main.jpg',
                      date: '2023-03-19T21:53:00+03:00'
                    },
                    {
                      title: 'Все инструменты собраны для съёмок трэша «День благодарения» (фото)',
                      text: 'Режиссёр Элай Рот приступил к приготовлению праздничной индейки ко «Дню благодарения» — съёмки фильма по мотивам фейк-трейлера таки начались. Кто говорил, что обещанного надо ждать три года, явно нёс какую-то чушь. Тут пришлось ждать намного дольше — «Грайндхаус» Тарантино и Родригеса, где показывали подобные ролики несуществующих фильмов, вышел в 2007 году.Студия-прокатчик Sony пристроилась к производственной компании Spyglass, выдавшей киноделу бюджет.А вот и первое промо по случаю. Вместе с ним шёл комментарий: «Объедков не будет».',
                      coverUrl: '',
                      date: '2023-03-19T21:51:00+03:00'
                    },
                    {
                      title: 'Зак Снайдер показал Бэтфлека и намекнул на кинопрокат «Лиги справедливости»',
                      text: 'Постановщик кинотрилогии DC Зак Снайдер продолжает подогревать интерес к апрельскому мероприятию, истинная природа которого до сих пор до конца неясна. Но предположения строятся, и их много от самых тривиальных до практически нереальных. Но все уже в курсе, что после релиза Снайдерката для фанатов постановщика нет ничего невозможного.В своём аккаунте соцести Vero Снайдер опубликовал ещё один анонс, который сетевые «аналитики» расшифровывают более или менее однозначно: в конце апреля в избранные кинотеатры вернутся «Человек из стали» (28 апреля) и «Бэтмен против Супермена» (29 апреля), а 30 апреля состоится кинопремьера «Лиги справедливости» в IMAX-формате.Режиссёр ничего пояснять не стал. Не время.\n',
                      coverUrl: 'https://kg-portal.ru/img/114312/main.jpg',
                      date: '2023-03-19T00:57:00+03:00'
                    },
                    {
                      title: 'Это фиаско, Шазам! Кинокомикс показывает очень плохой старт в американском прокате',
                      text: '«Шазам! 2» явно решил осуществить операцию по самоликвидации из фильмов по дисишным кинокомиксам — за пятницу сиквел заработал в домашнем прокате $ 11,7 млн, куда включили $ 3,4 млн за четверг. Как говорят эксперты, ленте не светит больше $ 30 млн за премьерный уик-энд.Это будет один из худших стартов для голливудской супергероики. И заметно хуже результата первой части, заработавшей в первые дни $ 53,5 млн.Профессиональная критика опустила уровень «свежести» по сравнению с оригиналом 2019 года, и зрительская оценка посмотревших тоже снизилась.Похоже, «Шазам 2» не вызвал у зрителей никакого энтузиазма. Недавно публика уже посмотрела фильм про персонажа с молнией на груди. К тому же после пришествия Джеймса Ганна уже нет особого смысла следить за второстепенными релизами. Да и все ждут «Флэша», а одним камео Чудо-женщины никого не удивишь.',
                      coverUrl: 'https://kg-portal.ru/img/114304/main.jpg',
                      date: '2023-03-18T21:39:00+03:00'
                    },
                    {
                      title: '«Мне очень нужна была работа»: звезда «Шазама 2» объяснила, зачем присоединилась к DC',
                      text: 'Недавно выстрелившая с «Вестсайдской историей» Рэйчел Зеглер совсем скоро появится в диснеевской «Белоснежке» и приквеле «Голодных игр». А прямо сейчас в кинотеатрах идёт «Шазам 2», где актриса сыграла одну из богинь, дочерей Атласа. Но, как оказалось, в DC она попала не от хорошей жизни:Мне очень нужна была работа. Я серьёзно. Реальность такова, что была пандемия, я не работала и не могла получить работу, потому что «Вестсайдская история» ещё не вышла. Мне было очень трудно что-то найти.Я люблю первый фильм, и мне очень повезло, что они вообще позвали меня на прослушивание и я в итоге получила эту роль. Там у меня появились сразу несколько лучших друзей, и я просто обожаю этот фильм.Времена такие — за роли в кинокомиксах серьёзным актёрам снова приходится оправдываться. Интересно, что в свою защиту сказала бы Хелен Миррен.Что до Закари Ливая, его будущее как дисишного супергероя решается прямо сейчас — у Дэвида Ф. Сандберга уже есть задумки для третьей части, но последнее слово, само собой, за бабками.',
                      coverUrl: 'https://kg-portal.ru/img/114300/main.jpg',
                      date: '2023-03-18T20:09:00+03:00'
                    },
                    {
                      title: 'Сломленные и жалкие — Джош Гад раскритиковал ненавистников «Русалочки»',
                      text: 'Пока трейлер «Русалочки» с Холли Бейли тонет в дизлайках, Лефу киномира Disney Джош Гад высказал ненавистникам грядущего фильма всё, что о них думает. Актёр сделал ретвит поста организации Call to Activism с новостью о реакции зрителей на ролик и подписал его так:Представьте, настолько нужно быть сломленными и жалкими, чтобы больше всего переживать о цвете кожи воображаемой поющей русалки.На данный момент у трейлера «Русалочки» 198 тыс. лайков и более 800 тыс. дизлайков. За то, чтобы показать его на «Оскаре 2023», Disney заплатила порядка $ 10 млн.Премьера фильма состоится 24 мая.',
                      coverUrl: 'https://kg-portal.ru/img/114297/main.jpg',
                      date: '2023-03-18T14:39:00+03:00'
                    },
                    {
                      title: '«Вали отсюда на**й!» — Брюс Кэмпбелл ответил недовольному фанату на премьере «Восстания зловещих мертвецов»',
                      text: 'Уже 21 апреля на большие экраны вернётся культовый хоррор-франчайз с новой частью «Восстание зловещих мертвецов». И хотя до проката ещё месяц, премьерный показ уже состоялся — критики даже успели осыпать продолжение восторженными отзывами. Но на каждую бочку мёда найдётся своя ложка дёгтя — и даже новая глава противостояния людей и демонов не всем пришлась по вкусу.Премьера на кинофестивале South by Southwest закончилась встречей с актёрами и съёмочной группой фильма. Киношники, как это принято, рассказывали о создании картины и отвечали на вопросы зрителей. Однако среди последних нашёлся недовольный фанат: он в грубой и циничной форме назвал «Восстание» отстойным фильмом, швырнул ведёрко с попкорном и гордо потопал на выход. Но Брюс Кэмпбелл, который на этот раз выступал в качестве продюсера, не растерялся и ответил недовольному киноману прямо со сцены: «Вали отсюда на**й!». Прямо в духе своего персонажа Эша Уильямса — есть ещё порох в бум-балке и бензин в бензопиле.Действие «Восстания зловещих мертвецов» впервые развернётся в многоквартирном дома в пригороде Лос-Анджелеса. Главная героиня навещает сестру и племянников, когда зловещая книга пробуждает к жизни кровожадных демонов. И вместо семейного чаепития героям предстоит жестокая борьба за выживание с потусторонними силами. Поговаривают, Кэмпбелл засветится в ленте в необычном камео.',
                      coverUrl: 'https://kg-portal.ru/img/114294/main.jpg',
                      date: '2023-03-18T13:46:00+03:00'
                    },
                    {
                      title: 'Многострадальный экшен-триллер Роберта Родригеса с Беном Аффлеком скоро выйдет в прокат',
                      text: 'Экшен-триллер «Гипнотик» режиссёра Роберта Родригеса с Беном Аффлеком в главной роли внезапно получил дату кинотеатрального выхода — 12 мая. Лента, кстати, до сих пор считается недоделанной. Но главный постановщик устроил показ картины на фестивале SXSW, и зрители позитивно оценили увиденное, что, несомненно, порадовало создателей — творческую часть и финансирующую.Родригес прокомментировал:Я работаю над фильмом уже много лет. И живая реакция аудитории из моего родного города показала, что всё было не зря. Теперь я с нетерпением жду возможности поделиться этим с остальными поклонниками кино, которые хотят испытать безумную и головокружительную поездочку с непредсказуемыми поворотами.Около двух лет «Гипнотик» провёл в постпродакшене из-за банкротства домашнего прокатчика, съёмки трижды останавливались из-за пандемии, и сама идея снять именно этот фильм мучила Роберта на протяжении 20 лет.В сюжете по сценарию Родригеса и Макса Боренштейна Аффлек исполняет роль детектива, расследующего серию невероятных преступлений. Параллельно он ищет пропавшую дочь, чьё исчезновение связано с тайной правительственной программой.',
                      coverUrl: 'https://kg-portal.ru/img/114290/main.jpg',
                      date: '2023-03-18T12:44:00+03:00'
                    },
                    {
                      title: 'Дензел Вашингтон станет первым по крутости персонажем «Гладиатора 2»',
                      text: 'В «Гладиаторе 2» появилась первая голливудская кинозвезда — Дензел Вашингтон, успевший поработать с Ридли Скоттом в 2007 году над криминальной драмой «Гангстер», но чаще Вашингтон снимался у покойного брата Скотта в фильмах «Гнев», «Дежавю» и «Неуправляемый».Издание Deadline пишет: после того, как на главную роль утвердили Пола Мескала, постановщик и президент Paramount Pictures задались целью найти высококлассного актёра на другую ведущую партию и решили рискнуть с Вашингтоном, прекрасно зная, что тот очень щепетильно относится к выбору фильмов. Но опасались напрасно — сценарий Вашингтону понравился и роль оказалась как раз его уровня крутости. Потом была личная встреча, и все ушли домой довольными.Кого именно сыграет актёр, не говорят.Как уже все прекрасно уяснили, «Гладиатор 2» продолжит историю первого фильма без его главных героев — персонажи Рассела Кроу и Хоакина Феникса по разным причинам не могут вернуться.Центральной фигурой повествования станет Луций — племянник императора Коммода (Феникс), а Максимус (Кроу) с ним пару раз поговорил. Вот и вся преемственность.Вчера мы писали, что в фильме также снимется Барри Кеоган.Paramount наметила дату премьеры на 22 ноября 2024 года.',
                      coverUrl: 'https://kg-portal.ru/img/114288/main.jpg',
                      date: '2023-03-18T11:29:00+03:00'
                    }
                  ]);
                resolve();
            }
        });
    });
}

function getData(link) {
    return new Promise((res, rej) => {
        fetch(`https://kg-portal.ru${link}`, {
            method: 'GET',
        }).catch(err => {
        }).then(resp => {
            if(resp != undefined) {
                resp.text().then(text => {
                    const { document } = (new JSDOM(text)).window;
                    try {
                        let title = document.getElementsByClassName("news_title").item(0).textContent;
                        let date = document.getElementsByClassName("date").item(0).attributes.getNamedItem("content").nodeValue;
        
                        let div = document.getElementsByClassName("news_text").item(0);
        
                        let pic = "";
                        for (let i = 0; i < div.children.length; i++) {
                            let element = div.children.item(i);
                            if(element.className == "news_cover_center") {
                                pic = "https://kg-portal.ru" + element.children.item(0).getElementsByTagName("img").item(0).src;
                            }
                        }
        
                        let content = "";
                        let arr = div.getElementsByTagName("p");
                        for (let i = 0; i < arr.length; i++) {
                            content += arr.item(i).textContent;
                        }
        
                        res({title: title, text: content, coverUrl: pic, date: date});
                    } catch (ex) {
                        res({});
                    }
                })
            } else {
                res({});
            }
        });
    });
}