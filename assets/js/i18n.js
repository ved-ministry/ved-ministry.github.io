// ============================================================
// I18N — English (default) / Deutsch / Français
// English lives directly in index.html as the fallback; this
// dictionary is only consulted when the visitor switches to DE/FR,
// and to restore EN when they switch back.
// ============================================================

const I18N = {
  en: {
    "nav.story": "Our Story",
    "nav.church": "VED Church",
    "nav.epyl": "EPYL",
    "nav.blog": "Bulletin",
    "nav.support": "Give &amp; Connect",

    "hero.top_left": "SERVING SINCE 1997 · CUSCO, PERU",
    "hero.top_right": "VEN-ID → VED",
    "hero.eyebrow": "A missionary family in the Andes",
    "hero.title": "Find out what <em>God</em> is doing in Peru.",
    "hero.sub": "For over twenty-five years, Cristóbal Churata has given his life and time to the Quechua-speaking towns around Cusco — now planting a church, and raising up the next generation of pastors and leaders.",
    "hero.cta_story": "Meet the Family",
    "hero.cta_support": "Support the Work",
    "hero.scroll": "Scroll to begin",

    "story.label": "01 · Our Story",
    "story.title": "From rebellion to a calling.",
    "story.intro": "This is Cristóbal Churata's own testimony — how a young man from Cusco, raised without any fear of God, was found by Him and called to serve the very people he grew up among.",
    "story.s1_title": "A home built on tradition, not truth",
    "story.s1_text": "<p>I was born into a Catholic home devoted to tradition — the same path my parents had inherited from theirs. My adolescent years passed without any real fear of God, because the people I looked up to didn't fear Him either. I grew up watching deceit treated as normal, and drinking treated as part of our culture. Seeing my parents and friends follow the same customs, I followed too.</p>",
    "story.s2_title": "The death of my father",
    "story.s2_text": "<p>My father was the central figure in my life — we spent years working the fields together, and I learned to work because of him. When God took him, in my foolishness I shook my finger at heaven: “How could a loving God tragically take my father from me?” I cried, and dedicated myself to drinking even more, to show my friends how much I was hurting.</p>",
    "story.s3_title": "A brother's prayers",
    "story.s3_text": "<p>I brought in the new year with a drinking binge that lasted a week, and ended up in bed, sick, throwing up blood for days. I asked myself: where are my friends now? Who will care for me? Nobody. But God had prepared that moment to bring me His Word. My older brother Florencio had been praying for me all along, together with friends from his church and seminary, asking God to save me and show me His mercy.</p>",
    "story.s4_title": "February, a youth camp in the Sacred Valley",
    "story.s4_text": "<p>God intervened during a youth camp held by the Baptist churches in the Sacred Valley of Urubamba. I understood, for the first time, that I was lost — separated from God, without hope. The only way back to Him was the gift He had already provided: forgiveness through His Son, Jesus Christ. I remember the small prayer I prayed that day: <em>“Lord, I don't know how to ask you, but I know I need you to save me. Forgive me — I am a sinner, I am a sinner, I am a sinner.”</em></p>",
    "story.s5_title": "Twenty-five years walking with Him",
    "story.s5_text": "<p>In 1997, two years after my conversion, I was helping a missionary in the Chumbivilcas province and felt a deep love growing for the Quechua-speaking brothers and pastors of the countryside. I told my pastor what I was feeling, and he said simply: “God is calling you to serve Him.” He helped me take the next steps — theological training at the Baptist Seminary of Peru, 1999 to 2002. I am a different man now, transformed by God's love and His Word, and I have given my life to be an instrument in His hands.</p>",
    "story.quote": "“I do not account my life of any value to myself, if only I may finish my course and the ministry I received from the Lord Jesus — to testify to the gospel of the grace of God.”",
    "story.quote_cite": "Acts 20:24 · Cristóbal's life verse",
    "story.stat1": "Cristóbal Churata Quispe, born in Cusco",
    "story.stat2": "Married Celia Berna Romero",
    "story.stat3": "Children — Cesia, Caleb &amp; Camila",
    "story.stat4": "Years serving Christ in Cusco",

    "church.label": "02 · Planting a New Church",
    "church.title": "Iglesia Bautista “VED” — Cusco",
    "church.intro": "Years ago, Cristóbal planted his first congregation, Ven-Id. Today that work has grown into VED — “Vida en Dios,” Life in God — a young, registered Baptist church now organizing its own building and Sunday services in Cusco.",
    "church.name_label": "The Name",
    "church.name_title": "“Come and VED — see — the place.”",
    "church.name_text": "<p>We asked the young congregation to suggest a name, and we settled on VED — drawn from Matthew 28:6: “He is not here, for he has risen, as he said. Come, VED — see the place where the Lord lay.” The tomb is empty. Christ has risen. That is the one message we exist to preach to every soul in Cusco.</p>",
    "church.begin_label": "Beginnings",
    "church.begin_title": "Two years of prayer, then two families said yes",
    "church.begin_text": "<p>For two years we prayed the Lord would send a church-planting team. He answered with two families willing to start a new work in Cusco. Since March we have been meeting in the home of brother Rolando Quispe, who offered his house to begin. Pastor Julio Jaramillo — from Iglesia Getsemaní in Santa Anita, Lima, the church that sent Cristóbal into this work — came to preach at our opening service. We printed two thousand evangelistic tracts, and God provided ten thousand more through another ministry. The sowing has begun.</p>",
    "church.stat1": "People gathering each Sunday — kids, teens &amp; families",
    "church.stat3": "Evangelistic tracts printed and donated",
    "church.cta_title": "Would you like to come and serve?",
    "church.cta_text": "We regularly welcome visiting churches and teams for short mission trips to Cusco — evangelism, teaching, construction, and Vacation Bible School. If your church is praying about a mission trip to Peru, we would love to talk.",
    "church.cta_btn1": "Plan a Visit",
    "church.cta_btn2": "Support VED",

    "epyl.label": "03 · Equipping Pastors &amp; Leaders",
    "epyl.title": "EPYL — training workers for the harvest",
    "epyl.intro": "“Filled with the knowledge of His will” — Colossians 1:9. Since 2010, EPYL has been training pastors and spiritual leaders who serve the Quechua-speaking countryside around Cusco and Puno, most with little formal schooling but a deep hunger for God's Word.",
    "epyl.note": "EPYL trains and sends teachers into the field — not academics, but faithful men who know the simple principles of God's Word and pass them on to others.",
    "epyl.loc1_title": "Curahuasi",
    "epyl.loc1_desc": "Five days studying with Pastor Rolando and a group of leaders — Reynaldo, Santiago, Jesús, Julián, Paulino, Richar, Silvestre — learning to build a biblical outline and rightly handle the Word.",
    "epyl.loc2_title": "Desaguadero, Puno",
    "epyl.loc2_desc": "One of the hardest fields — pastors here work constantly just to get by, which leaves little room for study. The first EPYL graduating class is set to finish here.",
    "epyl.loc3_title": "Calca, Sacred Valley",
    "epyl.loc3_desc": "Training visits to pastors and leaders serving communities across the Sacred Valley of the Incas.",
    "epyl.loc4_title": "Ccatcca, Quispicanchi",
    "epyl.loc4_desc": "A rural province east of Cusco, home to several of the pastors and leaders EPYL walks alongside.",
    "epyl.quote1": "“I can still name every one of them — proof that God works through simple men. We spent five beautiful days studying together. It isn't easy teaching people with so little theological training, but they are the ones the Lord provides to reach others.”",
    "epyl.quote1_cite": "Cristóbal Churata, on the Curahuasi training",

    "blog.label": "04 · Field Notes",
    "blog.title": "Weekly Bulletin",
    "blog.intro": "Short updates from Cusco — new visits, answered prayers, and what God is doing week by week. New entries are added regularly.",

    "support.label": "05 · Give, Pray, Connect",
    "support.title": "Stand with the work in Cusco",
    "support.intro": "This ministry is sustained by God's people — near and far. Here are a few ways to be part of it, especially from outside Peru.",
    "support.card1_title": "Give",
    "support.card1_text": "Support the church plant, EPYL trainings, and the missionary family directly. International transfers welcome.",
    "support.wise_title": "International transfer — Wise (CHF), SWIFT",
    "support.usd_title": "US bank transfer — Wise (USD)",
    "support.account_type_label": "Account type",
    "support.routing_label": "Routing number — US only (wire / ACH)",
    "support.usd_account_label": "Account number",
    "support.usd_swift_label": "Swift / BIC — from outside the US",
    "support.bcp_title": "Peru bank transfer — BCP (Soles)",
    "support.name_label": "Name",
    "support.bank_label": "Bank",
    "support.bcp_account": "Account number",
    "support.bcp_cci": "Interbank account (CCI)",
    "support.card2_title": "Pray &amp; Encourage",
    "support.card2_text": "Send a note of encouragement or a prayer request — every message is read by the family.",
    "support.card2_btn": "Write a Message",
    "support.card3_title": "Come &amp; Serve",
    "support.card3_text": "Bring your church on a mission trip to Cusco — evangelism, teaching, construction, Vacation Bible School.",
    "support.card3_btn": "Plan a Trip",
    "support.form_name": "Name",
    "support.form_email": "Email",
    "support.form_country": "Country",
    "support.form_reason": "Reason",
    "support.form_reason_1": "Encouragement / Prayer",
    "support.form_reason_2": "Mission trip",
    "support.form_reason_3": "Question about giving",
    "support.form_reason_4": "Other",
    "support.form_message": "Message",
    "support.form_submit": "Send Message",

    "footer.slogan": "Serving the <span class=\"shake\">Master</span> in Cusco, Peru.",
    "footer.about": "Iglesia Bautista VED and the EPYL ministry, led by Cristóbal Churata and family — planting churches and training pastors in the Cusco region of Peru.",
    "footer.explore": "Explore",
    "footer.connect": "Connect",
    "footer.language": "Language",
    "footer.lang_en": "English",
    "footer.lang_de": "Deutsch",
    "footer.lang_fr": "Français",
    "footer.copyright": "© {year} Cristóbal Churata · VED Church &amp; EPYL Ministry, Cusco, Peru",
    "footer.built": "Built in faith, hosted on GitHub Pages",
  },

  de: {
    "nav.story": "Unsere Geschichte",
    "nav.church": "VED Kirche",
    "nav.epyl": "EPYL",
    "nav.blog": "Rundbrief",
    "nav.support": "Geben &amp; Kontakt",

    "hero.top_left": "IM DIENST SEIT 1997 · CUSCO, PERU",
    "hero.top_right": "VEN-ID → VED",
    "hero.eyebrow": "Eine Missionarsfamilie in den Anden",
    "hero.title": "Erfahre, was <em>Gott</em> in Peru tut.",
    "hero.sub": "Seit über fünfundzwanzig Jahren hat Cristóbal Churata sein Leben und seine Zeit den Quechua-sprachigen Ortschaften rund um Cusco gewidmet – heute gründet er eine Gemeinde und bildet die nächste Generation von Pastoren und Leitern aus.",
    "hero.cta_story": "Die Familie kennenlernen",
    "hero.cta_support": "Das Werk unterstützen",
    "hero.scroll": "Scrollen zum Beginnen",

    "story.label": "01 · Unsere Geschichte",
    "story.title": "Von der Rebellion zur Berufung.",
    "story.intro": "Dies ist das persönliche Zeugnis von Cristóbal Churata – wie ein junger Mann aus Cusco, der ohne Gottesfurcht aufwuchs, von Ihm gefunden und berufen wurde, genau den Menschen zu dienen, unter denen er aufwuchs.",
    "story.s1_title": "Ein Zuhause auf Tradition gebaut, nicht auf Wahrheit",
    "story.s1_text": "<p>Ich wurde in ein katholisches, traditionsverbundenes Zuhause hineingeboren – denselben Weg, den meine Eltern von ihren Eltern geerbt hatten. Meine Jugendjahre vergingen ohne echte Gottesfurcht, denn auch die Menschen, zu denen ich aufsah, fürchteten Ihn nicht. Ich wuchs damit auf, dass Betrug als normal galt und Trinken als Teil unserer Kultur. Da meine Eltern und Freunde denselben Gewohnheiten folgten, tat ich es auch.</p>",
    "story.s2_title": "Der Tod meines Vaters",
    "story.s2_text": "<p>Mein Vater war die zentrale Gestalt meines Lebens – wir haben jahrelang gemeinsam auf den Feldern gearbeitet, und durch ihn lernte ich zu arbeiten. Als Gott ihn nahm, streckte ich in meiner Torheit die Faust gen Himmel: „Wie konnte ein liebender Gott mir meinen Vater so tragisch nehmen?“ Ich weinte und stürzte mich noch mehr ins Trinken, um meinen Freunden zu zeigen, wie sehr ich litt.</p>",
    "story.s3_title": "Die Gebete eines Bruders",
    "story.s3_text": "<p>Ich begann das neue Jahr mit einem Trinkgelage, das eine ganze Woche dauerte, und landete krank im Bett – tagelang erbrach ich Blut. Ich fragte mich: Wo sind jetzt meine Freunde? Wer wird sich um mich kümmern? Niemand. Aber Gott hatte diesen Moment vorbereitet, um mir Sein Wort zu bringen. Mein älterer Bruder Florencio hatte die ganze Zeit für mich gebetet, zusammen mit Freunden aus seiner Gemeinde und seinem Seminar, und Gott gebeten, mich zu retten und mir Seine Gnade zu zeigen.</p>",
    "story.s4_title": "Februar, ein Jugendlager im Heiligen Tal",
    "story.s4_text": "<p>Gott griff während eines Jugendlagers ein, das die Baptistengemeinden im Heiligen Tal von Urubamba veranstalteten. Zum ersten Mal begriff ich, dass ich verloren war – getrennt von Gott, ohne Hoffnung. Der einzige Weg zurück zu Ihm war das Geschenk, das Er bereits bereitgestellt hatte: Vergebung durch Seinen Sohn Jesus Christus. Ich erinnere mich an das kleine Gebet, das ich an jenem Tag sprach: <em>„Herr, ich weiß nicht, wie ich dich bitten soll, aber ich weiß, dass ich gerettet werden muss. Vergib mir – ich bin ein Sünder, ich bin ein Sünder, ich bin ein Sünder.“</em></p>",
    "story.s5_title": "Fünfundzwanzig Jahre an Seiner Seite",
    "story.s5_text": "<p>Im Jahr 1997, zwei Jahre nach meiner Bekehrung, half ich einem Missionar in der Provinz Chumbivilcas und spürte eine tiefe Liebe zu den Quechua-sprachigen Brüdern und Pastoren auf dem Land wachsen. Ich erzählte meinem Pastor, was ich empfand, und er sagte schlicht: „Gott ruft dich, Ihm zu dienen.“ Er half mir, die nächsten Schritte zu gehen – theologische Ausbildung am Baptistischen Seminar von Peru, 1999 bis 2002. Ich bin heute ein anderer Mensch, verwandelt durch Gottes Liebe und Sein Wort, und ich habe mein Leben hingegeben, ein Werkzeug in Seiner Hand zu sein.</p>",
    "story.quote": "„Ich aber achte mein Leben nicht der Rede wert, wenn ich nur meinen Lauf vollende und den Dienst, den ich von dem Herrn Jesus empfangen habe, zu bezeugen das Evangelium der Gnade Gottes.“",
    "story.quote_cite": "Apostelgeschichte 20,24 · Cristóbals Lebensvers",
    "story.stat1": "Cristóbal Churata Quispe, geboren in Cusco",
    "story.stat2": "Heirat mit Celia Berna Romero",
    "story.stat3": "Kinder – Cesia, Caleb &amp; Camila",
    "story.stat4": "Jahre im Dienst für Christus in Cusco",

    "church.label": "02 · Gründung einer neuen Gemeinde",
    "church.title": "Iglesia Bautista „VED“ — Cusco",
    "church.intro": "Vor Jahren gründete Cristóbal seine erste Gemeinde, Ven-Id. Heute ist daraus VED geworden – „Vida en Dios“, Leben in Gott – eine junge, offiziell registrierte Baptistengemeinde, die derzeit ihr eigenes Gebäude und ihre Sonntagsgottesdienste in Cusco organisiert.",
    "church.name_label": "Der Name",
    "church.name_title": "„Kommt und VED – seht – die Stätte.“",
    "church.name_text": "<p>Wir baten die junge Gemeinde, Namen vorzuschlagen, und entschieden uns für VED – abgeleitet aus Matthäus 28,6: „Er ist nicht hier; er ist auferstanden, wie er gesagt hat. Kommt her und seht die Stätte, wo er gelegen hat.“ Das Grab ist leer. Christus ist auferstanden. Das ist die eine Botschaft, für die wir jeder Seele in Cusco predigen.</p>",
    "church.begin_label": "Die Anfänge",
    "church.begin_title": "Zwei Jahre Gebet, dann sagten zwei Familien Ja",
    "church.begin_text": "<p>Zwei Jahre lang beteten wir, dass der Herr ein Gemeindegründungsteam senden würde. Er antwortete mit zwei Familien, die bereit waren, ein neues Werk in Cusco zu beginnen. Seit März treffen wir uns im Haus von Bruder Rolando Quispe, der sein Haus für den Anfang zur Verfügung stellte. Pastor Julio Jaramillo – von der Iglesia Getsemaní in Santa Anita, Lima, der Gemeinde, die Cristóbal in dieses Werk aussandte – predigte bei unserem Eröffnungsgottesdienst. Wir druckten zweitausend Traktate, und Gott schenkte durch ein anderes Werk weitere zehntausend. Die Aussaat hat begonnen.</p>",
    "church.stat1": "Menschen versammeln sich jeden Sonntag – Kinder, Jugendliche &amp; Familien",
    "church.stat3": "Evangelistische Traktate gedruckt und gespendet",
    "church.cta_title": "Möchtest du kommen und mitdienen?",
    "church.cta_text": "Wir empfangen regelmäßig besuchende Gemeinden und Teams für kurze Missionsreisen nach Cusco – Evangelisation, Unterricht, Bauarbeiten und die biblische Ferienschule. Wenn eure Gemeinde über eine Missionsreise nach Peru nachdenkt, würden wir uns sehr über ein Gespräch freuen.",
    "church.cta_btn1": "Besuch planen",
    "church.cta_btn2": "VED unterstützen",

    "epyl.label": "03 · Pastoren und Leiter ausrüsten",
    "epyl.title": "EPYL – Arbeiter für die Ernte ausbilden",
    "epyl.intro": "„Erfüllt mit der Erkenntnis seines Willens“ – Kolosser 1,9. Seit 2010 bildet EPYL Pastoren und geistliche Leiter aus, die im Quechua-sprachigen Umland von Cusco und Puno dienen – die meisten mit wenig Schulbildung, aber mit großem Hunger nach Gottes Wort.",
    "epyl.note": "EPYL bildet Lehrer aus und sendet sie ins Feld – keine Akademiker, sondern treue Männer, die die einfachen Grundsätze von Gottes Wort kennen und an andere weitergeben.",
    "epyl.loc1_title": "Curahuasi",
    "epyl.loc1_desc": "Fünf Tage Studium mit Pastor Rolando und einer Gruppe von Leitern – Reynaldo, Santiago, Jesús, Julián, Paulino, Richar, Silvestre –, in denen sie lernten, eine biblische Gliederung zu erstellen und das Wort recht zu handhaben.",
    "epyl.loc2_title": "Desaguadero, Puno",
    "epyl.loc2_desc": "Eines der schwierigsten Einsatzgebiete – die Pastoren hier arbeiten ständig, nur um zu überleben, was wenig Raum für das Studium lässt. Hier wird die erste EPYL-Abschlussklasse ihren Abschluss machen.",
    "epyl.loc3_title": "Calca, Heiliges Tal",
    "epyl.loc3_desc": "Schulungsbesuche bei Pastoren und Leitern, die Gemeinden im Heiligen Tal der Inkas dienen.",
    "epyl.loc4_title": "Ccatcca, Quispicanchi",
    "epyl.loc4_desc": "Eine ländliche Provinz östlich von Cusco, Heimat mehrerer Pastoren und Leiter, die EPYL begleitet.",
    "epyl.quote1": "„Ich kann mich noch an jeden einzelnen Namen erinnern – ein Beweis, dass Gott durch einfache Männer wirkt. Wir verbrachten fünf wunderbare Tage gemeinsam im Studium. Es ist nicht leicht, Menschen mit so geringer theologischer Ausbildung zu unterrichten, aber sie sind es, die der Herr bereitstellt, um andere zu erreichen.“",
    "epyl.quote1_cite": "Cristóbal Churata, über die Schulung in Curahuasi",

    "blog.label": "04 · Notizen vom Feld",
    "blog.title": "Wöchentlicher Rundbrief",
    "blog.intro": "Kurze Updates aus Cusco – neue Besuche, erhörte Gebete und das, was Gott Woche für Woche tut. Neue Einträge werden regelmäßig hinzugefügt.",

    "support.label": "05 · Geben, Beten, Verbinden",
    "support.title": "Steh dem Werk in Cusco zur Seite",
    "support.intro": "Dieser Dienst wird von Gottes Volk getragen – nah und fern. Hier sind einige Wege, Teil davon zu werden, besonders von außerhalb Perus.",
    "support.card1_title": "Geben",
    "support.card1_text": "Unterstütze die Gemeindegründung, die EPYL-Schulungen und die Missionarsfamilie direkt. Internationale Überweisungen willkommen.",
    "support.wise_title": "Internationale Überweisung — Wise (CHF), SWIFT",
    "support.usd_title": "US-Banküberweisung — Wise (USD)",
    "support.account_type_label": "Kontotyp",
    "support.routing_label": "Routing Number — nur USA (Wire / ACH)",
    "support.usd_account_label": "Kontonummer",
    "support.usd_swift_label": "Swift / BIC — von außerhalb der USA",
    "support.bcp_title": "Peruanische Banküberweisung — BCP (Soles)",
    "support.name_label": "Name",
    "support.bank_label": "Bank",
    "support.bcp_account": "Kontonummer",
    "support.bcp_cci": "Interbank-Konto (CCI)",
    "support.card2_title": "Beten &amp; Ermutigen",
    "support.card2_text": "Sende eine ermutigende Nachricht oder ein Gebetsanliegen – jede Nachricht wird von der Familie gelesen.",
    "support.card2_btn": "Nachricht schreiben",
    "support.card3_title": "Kommen &amp; Dienen",
    "support.card3_text": "Bring deine Gemeinde auf eine Missionsreise nach Cusco – Evangelisation, Unterricht, Bauarbeiten, biblische Ferienschule.",
    "support.card3_btn": "Reise planen",
    "support.form_name": "Name",
    "support.form_email": "E-Mail",
    "support.form_country": "Land",
    "support.form_reason": "Anliegen",
    "support.form_reason_1": "Ermutigung / Gebet",
    "support.form_reason_2": "Missionsreise",
    "support.form_reason_3": "Frage zu Spenden",
    "support.form_reason_4": "Sonstiges",
    "support.form_message": "Nachricht",
    "support.form_submit": "Nachricht senden",

    "footer.slogan": "Dem <span class=\"shake\">Meister</span> dienen in Cusco, Peru.",
    "footer.about": "Iglesia Bautista VED und der EPYL-Dienst, geleitet von Cristóbal Churata und seiner Familie – Gemeindegründung und Pastorenschulung in der Region Cusco, Peru.",
    "footer.explore": "Entdecken",
    "footer.connect": "Kontakt",
    "footer.language": "Sprache",
    "footer.lang_en": "Englisch",
    "footer.lang_de": "Deutsch",
    "footer.lang_fr": "Französisch",
    "footer.copyright": "© {year} Cristóbal Churata · VED Kirche &amp; EPYL-Dienst, Cusco, Peru",
    "footer.built": "In Glauben gebaut, gehostet auf GitHub Pages",
  },

  fr: {
    "nav.story": "Notre Histoire",
    "nav.church": "Église VED",
    "nav.epyl": "EPYL",
    "nav.blog": "Bulletin",
    "nav.support": "Don &amp; Contact",

    "hero.top_left": "AU SERVICE DEPUIS 1997 · CUSCO, PÉROU",
    "hero.top_right": "VEN-ID → VED",
    "hero.eyebrow": "Une famille missionnaire dans les Andes",
    "hero.title": "Découvrez ce que <em>Dieu</em> fait au Pérou.",
    "hero.sub": "Depuis plus de vingt-cinq ans, Cristóbal Churata a donné sa vie et son temps aux villages quechuas des environs de Cusco — aujourd'hui, il plante une église et forme la nouvelle génération de pasteurs et de responsables.",
    "hero.cta_story": "Découvrir la famille",
    "hero.cta_support": "Soutenir l'œuvre",
    "hero.scroll": "Faites défiler pour commencer",

    "story.label": "01 · Notre Histoire",
    "story.title": "De la rébellion à l'appel.",
    "story.intro": "Voici le témoignage personnel de Cristóbal Churata — comment un jeune homme de Cusco, élevé sans aucune crainte de Dieu, a été trouvé par Lui et appelé à servir le peuple même parmi lequel il a grandi.",
    "story.s1_title": "Un foyer bâti sur la tradition, non sur la vérité",
    "story.s1_text": "<p>Je suis né dans un foyer catholique attaché à la tradition — le même chemin que mes parents avaient hérité des leurs. Mon adolescence s'est écoulée sans réelle crainte de Dieu, car les gens que j'admirais ne Le craignaient pas non plus. J'ai grandi en voyant la tromperie traitée comme normale, et l'alcool comme partie de notre culture. Voyant mes parents et mes amis suivre les mêmes habitudes, je les ai suivies aussi.</p>",
    "story.s2_title": "La mort de mon père",
    "story.s2_text": "<p>Mon père était la figure centrale de ma vie — nous avons passé des années à travailler les champs ensemble, et c'est grâce à lui que j'ai appris à travailler. Quand Dieu l'a repris, dans ma folie j'ai levé le poing vers le ciel : « Comment un Dieu d'amour a-t-il pu m'arracher mon père si tragiquement ? » J'ai pleuré, et je me suis mis à boire encore plus, pour montrer à mes amis combien je souffrais.</p>",
    "story.s3_title": "Les prières d'un frère",
    "story.s3_text": "<p>J'ai commencé la nouvelle année par une beuverie qui a duré une semaine, et je me suis retrouvé alité, malade, vomissant du sang pendant des jours. Je me suis demandé : où sont mes amis maintenant ? Qui va prendre soin de moi ? Personne. Mais Dieu avait préparé ce moment pour m'apporter Sa Parole. Mon frère aîné Florencio priait pour moi depuis longtemps, avec des amis de son église et de son séminaire, demandant à Dieu de me sauver et de me montrer Sa miséricorde.</p>",
    "story.s4_title": "Février, un camp de jeunes dans la Vallée Sacrée",
    "story.s4_text": "<p>Dieu est intervenu lors d'un camp de jeunes organisé par les églises baptistes dans la Vallée Sacrée d'Urubamba. J'ai compris, pour la première fois, que j'étais perdu — séparé de Dieu, sans espoir. Le seul chemin vers Lui était le don qu'Il avait déjà préparé : le pardon par Son Fils, Jésus-Christ. Je me souviens de la petite prière que j'ai priée ce jour-là : <em>« Seigneur, je ne sais pas comment te demander, mais je sais que j'ai besoin que tu me sauves. Pardonne-moi — je suis un pécheur, je suis un pécheur, je suis un pécheur. »</em></p>",
    "story.s5_title": "Vingt-cinq ans à marcher avec Lui",
    "story.s5_text": "<p>En 1997, deux ans après ma conversion, j'aidais un missionnaire dans la province de Chumbivilcas et j'ai senti grandir un amour profond pour les frères et pasteurs quechuas de la campagne. J'ai dit à mon pasteur ce que je ressentais, et il m'a simplement dit : « Dieu t'appelle à Le servir. » Il m'a aidé à franchir les étapes suivantes — une formation théologique au Séminaire Baptiste du Pérou, de 1999 à 2002. Je suis aujourd'hui un homme différent, transformé par l'amour de Dieu et Sa Parole, et j'ai donné ma vie pour être un instrument entre Ses mains.</p>",
    "story.quote": "« Mais je ne fais aucun cas de ma vie, comme si elle m'était précieuse, pourvu que j'accomplisse ma course avec joie, et le ministère que j'ai reçu du Seigneur Jésus, d'annoncer la bonne nouvelle de la grâce de Dieu. »",
    "story.quote_cite": "Actes 20.24 · Le verset de vie de Cristóbal",
    "story.stat1": "Cristóbal Churata Quispe, né à Cusco",
    "story.stat2": "Mariage avec Celia Berna Romero",
    "story.stat3": "Enfants — Cesia, Caleb &amp; Camila",
    "story.stat4": "Années au service du Christ à Cusco",

    "church.label": "02 · Implantation d'une nouvelle église",
    "church.title": "Iglesia Bautista « VED » — Cusco",
    "church.intro": "Il y a des années, Cristóbal a planté sa première congrégation, Ven-Id. Aujourd'hui, cette œuvre est devenue VED — « Vida en Dios », Vie en Dieu — une jeune église baptiste enregistrée qui organise désormais son propre bâtiment et ses cultes du dimanche à Cusco.",
    "church.name_label": "Le Nom",
    "church.name_title": "« Venez et VED — voyez — le lieu. »",
    "church.name_text": "<p>Nous avons demandé à la jeune congrégation de proposer des noms, et nous avons choisi VED — tiré de Matthieu 28.6 : « Il n'est point ici ; il est ressuscité, comme il l'avait dit. Venez, voyez le lieu où il était couché. » Le tombeau est vide. Christ est ressuscité. C'est là l'unique message que nous existons pour prêcher à chaque âme de Cusco.</p>",
    "church.begin_label": "Les débuts",
    "church.begin_title": "Deux ans de prière, puis deux familles ont dit oui",
    "church.begin_text": "<p>Pendant deux ans, nous avons prié pour que le Seigneur envoie une équipe d'implantation d'église. Il a répondu avec deux familles prêtes à commencer une nouvelle œuvre à Cusco. Depuis mars, nous nous réunissons chez le frère Rolando Quispe, qui a offert sa maison pour débuter. Le pasteur Julio Jaramillo — de l'Iglesia Getsemaní à Santa Anita, Lima, l'église qui a envoyé Cristóbal dans cette œuvre — est venu prêcher lors de notre culte d'ouverture. Nous avons imprimé deux mille tracts évangélistiques, et Dieu en a fourni dix mille de plus par un autre ministère. Les semailles ont commencé.</p>",
    "church.stat1": "Personnes réunies chaque dimanche — enfants, adolescents &amp; familles",
    "church.stat3": "Tracts évangélistiques imprimés et donnés",
    "church.cta_title": "Souhaitez-vous venir servir ?",
    "church.cta_text": "Nous accueillons régulièrement des églises et des équipes en visite pour de courts voyages missionnaires à Cusco — évangélisation, enseignement, construction et école biblique de vacances. Si votre église envisage un voyage missionnaire au Pérou, nous serions ravis d'en discuter.",
    "church.cta_btn1": "Planifier une visite",
    "church.cta_btn2": "Soutenir VED",

    "epyl.label": "03 · Équiper pasteurs et responsables",
    "epyl.title": "EPYL — former des ouvriers pour la moisson",
    "epyl.intro": "« Remplis de la connaissance de sa volonté » — Colossiens 1.9. Depuis 2010, EPYL forme des pasteurs et des responsables spirituels au service des campagnes quechuas autour de Cusco et de Puno, la plupart avec peu de scolarité mais une profonde soif de la Parole de Dieu.",
    "epyl.note": "EPYL forme et envoie des enseignants sur le terrain — non des universitaires, mais des hommes fidèles qui connaissent les principes simples de la Parole de Dieu et les transmettent à d'autres.",
    "epyl.loc1_title": "Curahuasi",
    "epyl.loc1_desc": "Cinq jours d'étude avec le pasteur Rolando et un groupe de responsables — Reynaldo, Santiago, Jesús, Julián, Paulino, Richar, Silvestre — apprenant à construire un plan biblique et à bien manier la Parole.",
    "epyl.loc2_title": "Desaguadero, Puno",
    "epyl.loc2_desc": "L'un des terrains les plus difficiles — les pasteurs y travaillent sans relâche juste pour subvenir à leurs besoins, laissant peu de place à l'étude. La première promotion EPYL doit y terminer sa formation.",
    "epyl.loc3_title": "Calca, Vallée Sacrée",
    "epyl.loc3_desc": "Visites de formation auprès de pasteurs et responsables au service de communautés à travers la Vallée Sacrée des Incas.",
    "epyl.loc4_title": "Ccatcca, Quispicanchi",
    "epyl.loc4_desc": "Une province rurale à l'est de Cusco, où vivent plusieurs des pasteurs et responsables accompagnés par EPYL.",
    "epyl.quote1": "« Je peux encore nommer chacun d'entre eux — preuve que Dieu agit à travers des hommes simples. Nous avons passé cinq belles journées à étudier ensemble. Ce n'est pas facile d'enseigner des personnes ayant si peu de formation théologique, mais ce sont eux que le Seigneur pourvoit pour atteindre les autres. »",
    "epyl.quote1_cite": "Cristóbal Churata, à propos de la formation à Curahuasi",

    "blog.label": "04 · Notes de terrain",
    "blog.title": "Bulletin hebdomadaire",
    "blog.intro": "Brèves mises à jour depuis Cusco — nouvelles visites, prières exaucées, et ce que Dieu fait semaine après semaine. De nouveaux articles sont ajoutés régulièrement.",

    "support.label": "05 · Don, Prière, Contact",
    "support.title": "Soutenez l'œuvre à Cusco",
    "support.intro": "Ce ministère est soutenu par le peuple de Dieu — proche et lointain. Voici quelques façons d'en faire partie, surtout depuis l'étranger.",
    "support.card1_title": "Faire un don",
    "support.card1_text": "Soutenez directement l'implantation de l'église, les formations EPYL et la famille missionnaire. Virements internationaux bienvenus.",
    "support.wise_title": "Virement international — Wise (CHF), SWIFT",
    "support.usd_title": "Virement bancaire américain — Wise (USD)",
    "support.account_type_label": "Type de compte",
    "support.routing_label": "Numéro d'acheminement — États-Unis uniquement (virement / ACH)",
    "support.usd_account_label": "Numéro de compte",
    "support.usd_swift_label": "Swift / BIC — depuis l'étranger",
    "support.bcp_title": "Virement bancaire péruvien — BCP (Soles)",
    "support.name_label": "Nom",
    "support.bank_label": "Banque",
    "support.bcp_account": "Numéro de compte",
    "support.bcp_cci": "Compte interbancaire (CCI)",
    "support.card2_title": "Prier &amp; Encourager",
    "support.card2_text": "Envoyez un mot d'encouragement ou une demande de prière — chaque message est lu par la famille.",
    "support.card2_btn": "Écrire un message",
    "support.card3_title": "Venir &amp; Servir",
    "support.card3_text": "Emmenez votre église en voyage missionnaire à Cusco — évangélisation, enseignement, construction, école biblique de vacances.",
    "support.card3_btn": "Planifier un voyage",
    "support.form_name": "Nom",
    "support.form_email": "E-mail",
    "support.form_country": "Pays",
    "support.form_reason": "Motif",
    "support.form_reason_1": "Encouragement / Prière",
    "support.form_reason_2": "Voyage missionnaire",
    "support.form_reason_3": "Question sur les dons",
    "support.form_reason_4": "Autre",
    "support.form_message": "Message",
    "support.form_submit": "Envoyer le message",

    "footer.slogan": "Au service du <span class=\"shake\">Maître</span> à Cusco, Pérou.",
    "footer.about": "L'Iglesia Bautista VED et le ministère EPYL, dirigés par Cristóbal Churata et sa famille — implantation d'églises et formation de pasteurs dans la région de Cusco, au Pérou.",
    "footer.explore": "Explorer",
    "footer.connect": "Contact",
    "footer.language": "Langue",
    "footer.lang_en": "Anglais",
    "footer.lang_de": "Allemand",
    "footer.lang_fr": "Français",
    "footer.copyright": "© {year} Cristóbal Churata · Église VED &amp; Ministère EPYL, Cusco, Pérou",
    "footer.built": "Construit avec foi, hébergé sur GitHub Pages",
  },
};

(function () {
  "use strict";

  function applyLang(lang) {
    const dict = I18N[lang] || I18N.en;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) el.textContent = dict[key].replace(/&amp;/g, "&");
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });

    const copyEl = document.getElementById("copyrightLine");
    if (copyEl && dict["footer.copyright"]) {
      copyEl.innerHTML = dict["footer.copyright"].replace("{year}", window.SITE_YEAR || new Date().getFullYear());
    }

    document.documentElement.lang = lang;
    document.querySelectorAll(".nav__lang button").forEach((b) => {
      b.setAttribute("aria-current", b.getAttribute("data-lang") === lang ? "true" : "false");
    });

    try {
      localStorage.setItem("ved_lang", lang);
    } catch (e) {}

    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
  }

  window.applyLang = applyLang;

  document.addEventListener("DOMContentLoaded", () => {
    let saved = "en";
    try {
      saved = localStorage.getItem("ved_lang") || "en";
    } catch (e) {}

    const copyEl = document.getElementById("copyrightLine");
    if (copyEl) {
      copyEl.innerHTML = copyEl.innerHTML.replace("{year}", window.SITE_YEAR || new Date().getFullYear());
    }

    if (saved !== "en") applyLang(saved);

    document.querySelectorAll("[data-lang]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        applyLang(btn.getAttribute("data-lang"));
      });
    });
  });
})();
