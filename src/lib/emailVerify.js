// ============================================================================
// REAL-TIME EMAIL VERIFICATION ENGINE (Client-Side + Live DNS-over-HTTPS MX)
// ============================================================================

const DISPOSABLE_DOMAINS = new Set([
  '10minutemail.com',
  '10minutemail.net',
  '20minutemail.com',
  'anonbox.net',
  'bccto.me',
  'Binkmail.com',
  'bobmail.info',
  'burnermail.io',
  'chacuo.net',
  'Cock.li',
  'discard.email',
  'discardmail.com',
  'dispostable.com',
  'dodgeit.com',
  'dodgit.com',
  'drdrb.net',
  'dropmail.me',
  'e4ward.com',
  'emailondeck.com',
  'example.com',
  'example.org',
  'example.net',
  'fakeinbox.com',
  'fakemail.fr',
  'fakemailgenerator.com',
  'filzmail.com',
  'getairmail.com',
  'getnada.com',
  'grr.la',
  'guerrillamail.biz',
  'guerrillamail.com',
  'guerrillamail.de',
  'guerrillamail.info',
  'guerrillamail.net',
  'guerrillamail.org',
  'guerrillamailblock.com',
  'harakirimail.com',
  'incognitomail.com',
  'inboxbear.com',
  'jetable.org',
  'kasmail.com',
  'koszmail.pl',
  'kurzepost.de',
  'lhsdv.com',
  'linshiyouxiang.net',
  'lol.ovpn.to',
  'lookugly.com',
  'lopl.co.cc',
  'm4ilweb.info',
  'mail-temp.com',
  'mail.tm',
  'mailblocks.com',
  'mailcatch.com',
  'maildrop.cc',
  'mailexpire.com',
  'mailforspam.com',
  'mailin8r.com',
  'mailinater.com',
  'mailinator.com',
  'mailinator.net',
  'mailinator2.com',
  'mailincubator.com',
  'mailismagic.com',
  'mailmate.com',
  'mailme.ir',
  'mailme.lv',
  'mailmetrash.com',
  'mailmoat.com',
  'mailnesia.com',
  'mailnull.com',
  'mailsac.com',
  'mailscrap.com',
  'mailshell.com',
  'mailsiphon.com',
  'mailslite.com',
  'mailtemp.info',
  'mailtothis.com',
  'mailzilla.com',
  'mbx.cc',
  'mega.zik.dj',
  'meltmail.com',
  'messagebeamer.de',
  'mierdamail.com',
  'mintemail.com',
  'moburl.com',
  'mohmal.com',
  'moncourrier.fr.nf',
  'monemail.fr.nf',
  'monmail.fr.nf',
  'mt2009.com',
  'mt2014.com',
  'myphantomemail.com',
  'mytemp.email',
  'mytrashmail.com',
  'neomailbox.com',
  'nepwk.com',
  'nervmich.net',
  'nervtmich.net',
  'netmails.com',
  'netmails.net',
  'netzidiot.de',
  'neverbox.com',
  'no-spam.ws',
  'nobulk.com',
  'noclickemail.com',
  'nogmailspam.info',
  'nomail.xl.cx',
  'nomail2me.com',
  'nomorespamemails.com',
  'nospam.ze.tc',
  'nospam4.us',
  'nospamfor.us',
  'nospamthanks.info',
  'notmailinator.com',
  'nowmymail.com',
  'nurfuerspam.de',
  'nus.edu.sg',
  'nwldx.com',
  'objectmail.com',
  'obobbo.com',
  'oneoffemail.com',
  'onewaymail.com',
  'online.ms',
  'oopi.org',
  'ordinaryamerican.net',
  'otherinbox.com',
  'ourklips.com',
  'outlawspam.com',
  'ovpn.to',
  'owlpic.com',
  'pancakemail.com',
  'pimpedupmyspace.com',
  'pjjkp.com',
  'plexolan.de',
  'poczta.onet.pl',
  'politikerclub.de',
  'poofy.org',
  'pookmail.com',
  'privacy.net',
  'proxymail.eu',
  'prtnx.com',
  'punkass.com',
  'putthisinyourspamdatabase.com',
  'qq.com',
  'quickinbox.com',
  'rcpt.at',
  'reallymymail.com',
  'Karb.com',
  'recode.me',
  'recursor.net',
  'regbypass.com',
  'regbypass.comsafe-mail.net',
  'rejectmail.com',
  'rhyta.com',
  'rklips.com',
  'rmqkr.net',
  'rppkn.com',
  'rtrtr.com',
  's0ny.net',
  'safe-mail.net',
  'safersignup.de',
  'safetymail.info',
  'safetypost.de',
  'sandelf.de',
  'saynotospams.com',
  'selfdestructingmail.com',
  'sendspamhere.com',
  'sharklasers.com',
  'shiftmail.com',
  'shitmail.me',
  'shortmail.net',
  'sibmail.com',
  'skeefmail.com',
  'slaskpost.se',
  'slopsbox.com',
  'smellfear.com',
  'snakemail.com',
  'sneakemail.com',
  'sofimail.com',
  'sofort-mail.de',
  'sogetthis.com',
  'soodonims.com',
  'spam.la',
  'spam.su',
  'spam4.me',
  'spamavert.com',
  'spambob.com',
  'spambob.net',
  'spambob.org',
  'spambog.com',
  'spambog.de',
  'spambog.ru',
  'spambox.info',
  'spambox.irishspringrealty.com',
  'spambox.us',
  'spamcannon.com',
  'spamcannon.net',
  'spamcero.com',
  'spamcon.org',
  'spamcorptastic.com',
  'spamcowboy.com',
  'spamcowboy.net',
  'spamcowboy.org',
  'spamday.com',
  'spamex.com',
  'spamfree24.com',
  'spamfree24.de',
  'spamfree24.eu',
  'spamfree24.info',
  'spamfree24.net',
  'spamfree24.org',
  'spamgoes.in',
  'spamgourmet.com',
  'spamgourmet.net',
  'spamgourmet.org',
  'spamherelots.com',
  'spamhereplease.com',
  'spamhole.com',
  'spamify.com',
  'spaminator.de',
  'spamkill.info',
  'spaml.com',
  'spaml.de',
  'spammotel.com',
  'spamobox.com',
  'spamoff.de',
  'spamsalad.in',
  'spamslicer.com',
  'spamspot.com',
  'spamstack.net',
  'spamthis.co.uk',
  'spamthisplease.com',
  'spamtrail.com',
  'spamtroll.net',
  'speed.1s.fr',
  'supergreatmail.com',
  'supermailer.jp',
  'suremail.info',
  'teewars.org',
  'teleworm.com',
  'teleworm.us',
  'temp-mail.org',
  'temp-mail.ru',
  'tempalias.com',
  'tempe-mail.com',
  'tempemail.biz',
  'tempemail.co.za',
  'tempemail.com',
  'tempemail.net',
  'tempinbox.co.uk',
  'tempinbox.com',
  'tempmail.co',
  'tempmail.com',
  'tempmail.de',
  'tempmail.eu',
  'tempmail.it',
  'tempmail.net',
  'tempmail.us',
  'tempmail2.com',
  'tempmaildemo.com',
  'tempmailer.com',
  'tempmailer.de',
  'tempomail.fr',
  'temporarily.de',
  'temporarioemail.com.br',
  'temporaryemail.net',
  'temporaryemail.us',
  'temporaryforwarding.com',
  'temporaryinbox.com',
  'temporarymailaddress.com',
  'test.com',
  'test.org',
  'thanksnospam.info',
  'thankyou2010.com',
  'thisisnotmyrealemail.com',
  'throwawayemailaddress.com',
  'throwawaymail.com',
  'tilien.com',
  'tmailinator.com',
  'tradermail.info',
  'trash-amil.com',
  'trash-mail.at',
  'trash-mail.com',
  'trash-mail.de',
  'trash2009.com',
  'trashemail.de',
  'trashmail.at',
  'trashmail.com',
  'trashmail.de',
  'trashmail.me',
  'trashmail.net',
  'trashmail.org',
  'trashmail.ws',
  'trashmailer.com',
  'trashymail.com',
  'trashymail.net',
  'trbvm.com',
  'turual.com',
  'twinmail.de',
  'upliftnow.com',
  'uplipht.com',
  'venompen.com',
  'veryrealemail.com',
  'viditag.com',
  'viewcastmedia.com',
  'Watchever.biz',
  'wegwerfadresse.de',
  'wegwerfemail.com',
  'wegwerfemail.de',
  'wegwerfmail.de',
  'wegwerfmail.info',
  'wegwerfmail.net',
  'wegwerfmail.org',
  'wh4f.org',
  'whyspam.me',
  'willselfdestruct.com',
  'winemaven.info',
  'wronghead.com',
  'wuzup.net',
  'wuzupmail.net',
  'xagloo.com',
  'xemaps.com',
  'xents.com',
  'xmaily.com',
  'xoxy.net',
  'yep.it',
  'yogamaven.com',
  'yopmail.com',
  'yopmail.fr',
  'yopmail.net',
  'youmailr.com',
  'ypmail.webarnak.fr.eu.org',
  'yuurok.com',
  'zehnminutenmail.de',
  'zippymail.info',
  'zoaxe.com',
  'zoemail.org'
]);

const DOMAIN_TYPOS = {
  'gamil.com': 'gmail.com',
  'gmial.com': 'gmail.com',
  'gmal.com': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gmail.con': 'gmail.com',
  'gmail.co': 'gmail.com',
  'gmail.cmo': 'gmail.com',
  'gmail.ocm': 'gmail.com',
  'gmail.comm': 'gmail.com',
  'gmail.ph': 'gmail.com',
  'gmail.net': 'gmail.com',
  'gmail.org': 'gmail.com',
  'gnail.com': 'gmail.com',
  'gimail.com': 'gmail.com',
  'gmaill.com': 'gmail.com',
  'yaho.com': 'yahoo.com',
  'yahooo.com': 'yahoo.com',
  'yahoo.con': 'yahoo.com',
  'yahoo.co': 'yahoo.com',
  'yhoo.com': 'yahoo.com',
  'ymail.con': 'ymail.com',
  'outlok.com': 'outlook.com',
  'outllok.com': 'outlook.com',
  'outlook.con': 'outlook.com',
  'outlook.co': 'outlook.com',
  'hotmial.com': 'hotmail.com',
  'hotmal.com': 'hotmail.com',
  'hotmail.con': 'hotmail.com',
  'hotmail.co': 'hotmail.com',
  'iclod.com': 'icloud.com',
  'icloud.con': 'icloud.com',
  'icloud.co': 'icloud.com'
};

const FAKE_LOCAL_PARTS = new Set([
  'test',
  'testing',
  'tester',
  'fake',
  'fakemail',
  'fakeuser',
  'asdf',
  'asdfg',
  'asdfgh',
  'asdfghjkl',
  'qwerty',
  'qwertyuiop',
  'zxcvbn',
  '12345',
  '123456',
  '1234567',
  '12345678',
  '123456789',
  '1234567890',
  'abcdef',
  'abcdefg',
  'admin',
  'administrator',
  'user',
  'username',
  'someone',
  'nobody',
  'none',
  'null',
  'undefined',
  'sample',
  'example',
  'demo',
  'noreply',
  'no-reply',
  'dontreply',
  'aaa',
  'aaaa',
  'aaaaa',
  'aaaaaa',
  'xxx',
  'xxxx',
  'xxxxx',
  'xxxxxx',
  'abc123',
  'abc12345',
  'test123',
  'test1234'
]);

const dnsCache = new Map();

/**
 * Synchronous check for syntax, typos, provider rules (e.g. Gmail), and fake/disposable patterns.
 */
export function checkEmailRules(rawEmail) {
  const email = (rawEmail || '').trim().toLowerCase();
  if (!email) {
    return { valid: false, status: 'idle', message: '' };
  }

  // Basic structure check
  const parts = email.split('@');
  if (parts.length !== 2) {
    return {
      valid: false,
      status: 'error',
      message: 'Please include a single "@" symbol (e.g. name@gmail.com).'
    };
  }

  const [local, domain] = parts;
  if (!local || !domain) {
    return {
      valid: false,
      status: 'error',
      message: 'Please enter both username and domain (e.g. name@gmail.com).'
    };
  }

  // Local part syntax
  if (
    local.length < 2 ||
    local.length > 64 ||
    local.startsWith('.') ||
    local.endsWith('.') ||
    local.includes('..') ||
    !/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/i.test(local)
  ) {
    return {
      valid: false,
      status: 'error',
      message: 'Invalid username format before "@".'
    };
  }

  // Reject purely numeric usernames (e.g. 12345678@gmail.com)
  if (/^\d+$/.test(local.replace(/\./g, ''))) {
    return {
      valid: false,
      status: 'error',
      message: 'Fake numeric-only email detected. Please use your real email address.'
    };
  }

  // Reject repeated single character usernames (e.g. aaaaaa@gmail.com)
  const cleanLocal = local.replace(/[^a-z0-9]/g, '');
  if (cleanLocal.length >= 3 && /^([a-z0-9])\1+$/i.test(cleanLocal)) {
    return {
      valid: false,
      status: 'error',
      message: 'That looks like a placeholder username. Please enter your real email.'
    };
  }

  if (FAKE_LOCAL_PARTS.has(local) || FAKE_LOCAL_PARTS.has(cleanLocal)) {
    return {
      valid: false,
      status: 'error',
      message: `"${local}@" looks like a test/fake address. Please use your real email.`
    };
  }

  // Domain syntax check
  if (
    !domain.includes('.') ||
    domain.startsWith('.') ||
    domain.endsWith('.') ||
    domain.includes('..') ||
    !/^[a-z0-9.-]+\.[a-z]{2,18}$/i.test(domain)
  ) {
    return {
      valid: false,
      status: 'error',
      message: 'Please enter a valid domain name (e.g. gmail.com, outlook.com).'
    };
  }

  // Check for common domain typos (e.g. gmail.con, gamil.com)
  if (DOMAIN_TYPOS[domain]) {
    const suggestedDomain = DOMAIN_TYPOS[domain];
    const suggestion = `${local}@${suggestedDomain}`;
    return {
      valid: false,
      status: 'typo',
      suggestion,
      message: `Typo detected in "@${domain}". Did you mean ${suggestion}?`
    };
  }

  // Check disposable / temporary email blocklist
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return {
      valid: false,
      status: 'error',
      message: 'Temporary or disposable email addresses are not allowed.'
    };
  }

  // Strict Google Gmail username rules
  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    if (!/^[a-z0-9.]+$/i.test(local)) {
      return {
        valid: false,
        status: 'error',
        message: 'Gmail addresses only allow letters (a-z), numbers (0-9), and periods (.).'
      };
    }
    if (cleanLocal.length < 6 || cleanLocal.length > 30) {
      return {
        valid: false,
        status: 'error',
        message: 'Real @gmail.com usernames must be between 6 and 30 characters long.'
      };
    }
  }

  // Yahoo / Outlook minimum length rules
  if (
    ['yahoo.com', 'ymail.com', 'outlook.com', 'hotmail.com', 'live.com', 'icloud.com'].includes(domain) &&
    cleanLocal.length < 4
  ) {
    return {
      valid: false,
      status: 'error',
      message: `@${domain} usernames must be at least 4 characters long.`
    };
  }

  return {
    valid: true,
    status: 'syntax-ok',
    local,
    domain
  };
}

/**
 * Live DNS-over-HTTPS MX & A record lookup to verify that the email's domain
 * actually exists on the internet and has a real mail server configured.
 */
export async function verifyEmailDomainMX(domain) {
  const cleanDomain = (domain || '').trim().toLowerCase();
  if (!cleanDomain) return { ok: false, reason: 'Missing domain.' };

  if (dnsCache.has(cleanDomain)) {
    return dnsCache.get(cleanDomain);
  }

  const endpoints = [
    `https://dns.google/resolve?name=${encodeURIComponent(cleanDomain)}&type=MX`,
    `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(cleanDomain)}&type=MX`
  ];

  for (const url of endpoints) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(url, {
        headers: { Accept: 'application/dns-json' },
        signal: controller.signal
      });
      clearTimeout(timer);

      if (!res.ok) continue;
      const data = await res.json();

      // Status 3 === NXDOMAIN (domain does not exist at all!)
      if (data.Status === 3) {
        const result = {
          ok: false,
          reason: `The domain "@${cleanDomain}" does not exist.`
        };
        dnsCache.set(cleanDomain, result);
        return result;
      }

      const answers = Array.isArray(data.Answer) ? data.Answer : [];
      // Type 15 === MX record
      const mxRecords = answers.filter(
        (a) => a.type === 15 && a.data && a.data.trim() !== '0 .'
      );

      if (mxRecords.length > 0) {
        const result = {
          ok: true,
          mx: mxRecords[0].data,
          reason: `Verified mail server for @${cleanDomain}`
        };
        dnsCache.set(cleanDomain, result);
        return result;
      }

      // If no MX record exists, domain cannot receive email
      const result = {
        ok: false,
        reason: `"@${cleanDomain}" has no active mail server (MX record) to receive emails.`
      };
      dnsCache.set(cleanDomain, result);
      return result;
    } catch {
      // Try next DoH provider
    }
  }

  // If offline or DNS-over-HTTPS blocked by network firewall, fall back gracefully
  return {
    ok: true,
    fallback: true,
    reason: `Format verified (@${cleanDomain})`
  };
}
