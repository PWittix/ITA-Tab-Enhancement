# Proof of Concept - Enhanced Tabulated Version
Site is live at: https://pwittix.github.io/ITA-Tab-Enhancement/

Submit Data to a google spreadsheet via form https://docs.google.com/forms/d/e/1FAIpQLScFYdQisr1QOVxUPxlumtGbmg1PjLIECc6SpfAptX9gbNlyjA/viewform

Data is treated as JSON and read into the document.

Future improvements:

time: n minutes/hours ago

Known Issues:
If you are browsing a tab and a new tab appears to the left of (earlier than) your tab, you will be moved from the tab you were viewing to the next tab to the left.  This is because the check returns the current index of your tab.  If you are browsing tab # 3 and a new tab enters 

[a,b,c,d,e,]\n
[0,1,2,3,4]\n
add N to the new tab location\n
[a,N,b,c,d,e]\n
[0,1,2,3,4,5]\n
you will no longer be browsing tab d, but tab c.  

This is an enhanced example of https://github.com/PWittix/ITA-Tab
