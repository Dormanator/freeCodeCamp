 //         TELEPHONE NUMBERS          \\
//                                      \\
function telephoneCheck(str) {
    // can start with country code and space, just code, or no code ^(1\s|1)?
    // can have parenthese around 3 first digits or not \(?\)?
    // 3 first digits are captured (\d{3})
    // and followed by nothing, a space, or a dash [-\s]?
    // 3 digits occur again, recalling the capture, \2 
    // followed by nothing, a space, or a dash [-\s]?
    // and then followed by 4 digits at the end \d{4}$
    const teleRegExp = /^(1\s|1)?\(?(\d{3})\)?[-\s]?\2[-\s]?\d{4}$/
    return teleRegExp.test(str);
}
// ## FIX FOR: ##
// telephoneCheck("1 555)555-5555") // F
// telephoneCheck("1 456 789 4444") // T
// telephoneCheck("555)-555-5555") // F
// telephoneCheck("(555-555-5555") // F