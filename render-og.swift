import AppKit
import Foundation

struct Card {
    let slug: String
    let label: String
    let lines: [String]
    let image: String
    let dark: Bool
}

let cards = [
    Card(slug:"home", label:"ESTÚDIO · FLORIANÓPOLIS", lines:["Movimento", "consciente."], image:"coletivo-pilates-hero-equipe.jpg", dark:false),
    Card(slug:"coletivo", label:"O COLETIVO", lines:["Uma equipe.", "Um método."], image:"coletivo-pilates-hero-equipe-descontraida.jpg", dark:false),
    Card(slug:"aulas", label:"AULAS & MÉTODO", lines:["Prática precisa.", "Movimento vivo."], image:"coletivo-pilates-aulas-1.jpg", dark:false),
    Card(slug:"academy", label:"TWR ACADEMY", lines:["Formação em", "Pilates clássico."], image:"coletivo-pilates-twr-academy-4.jpg", dark:true),
    Card(slug:"journal", label:"JOURNAL", lines:["Corpo, método", "e presença."], image:"coletivo-pilates-aulas-9.jpg", dark:false),
    Card(slug:"journal-1", label:"JOURNAL · HISTÓRIA", lines:["A evolução do", "Classic Pilates", "no Brasil."], image:"coletivo-pilates-twr-academy-1.jpg", dark:false),
    Card(slug:"journal-2", label:"JOURNAL · TÉCNICA", lines:["Respiração:", "o motor do", "Powerhouse."], image:"coletivo-pilates-twr-academy-2.jpg", dark:false),
    Card(slug:"journal-3", label:"JOURNAL · EVENTOS", lines:["Workshop:", "Coluna Viva."], image:"coletivo-pilates-twr-academy-3.jpg", dark:false),
    Card(slug:"journal-4", label:"JOURNAL · EQUIPAMENTOS", lines:["Reformer", "vs Cadillac."], image:"coletivo-pilates-twr-academy-4.jpg", dark:false),
    Card(slug:"shop", label:"COLETIVO SHOP", lines:["O método", "também se veste."], image:"coletivo-pilates-aulas-8.jpg", dark:false)
]

let fm = FileManager.default
let root = URL(fileURLWithPath: fm.currentDirectoryPath)
let imageDir = root.appendingPathComponent("assets/img")
let outDir = root.appendingPathComponent("assets/og")
try? fm.createDirectory(at: outDir, withIntermediateDirectories: true)
let W: CGFloat = 1200, H: CGFloat = 630
let orange = NSColor(calibratedRed: 227/255, green: 82/255, blue: 5/255, alpha: 1)

func rect(_ x: CGFloat, _ top: CGFloat, _ width: CGFloat, _ height: CGFloat) -> NSRect {
    NSRect(x:x, y:H-top-height, width:width, height:height)
}

func drawText(_ text:String, x:CGFloat, top:CGFloat, width:CGFloat, height:CGFloat, font:NSFont, color:NSColor, kern:CGFloat = 0) {
    let style=NSMutableParagraphStyle(); style.lineBreakMode = .byClipping
    let attrs:[NSAttributedString.Key:Any] = [.font:font,.foregroundColor:color,.kern:kern,.paragraphStyle:style]
    (text as NSString).draw(in:rect(x,top,width,height),withAttributes:attrs)
}

for card in cards {
    let canvas=NSImage(size:NSSize(width:W,height:H))
    canvas.lockFocus()
    let bg = card.dark ? NSColor(calibratedWhite:0.12,alpha:1) : NSColor(calibratedRed:243/255,green:243/255,blue:240/255,alpha:1)
    let ink = card.dark ? NSColor(calibratedWhite:0.95,alpha:1) : NSColor(calibratedWhite:0.07,alpha:1)
    let muted = card.dark ? NSColor(calibratedWhite:0.67,alpha:1) : NSColor(calibratedWhite:0.40,alpha:1)
    bg.setFill(); NSRect(x:0,y:0,width:W,height:H).fill()

    let grid=card.dark ? NSColor.white.withAlphaComponent(0.035) : NSColor.black.withAlphaComponent(0.035)
    grid.setStroke()
    for n in stride(from:CGFloat(0), through:CGFloat(510), by:CGFloat(8)) { let p=NSBezierPath();p.move(to:NSPoint(x:n,y:0));p.line(to:NSPoint(x:n,y:H));p.stroke() }
    for n in stride(from:CGFloat(0), through:H, by:CGFloat(8)) { let p=NSBezierPath();p.move(to:NSPoint(x:0,y:n));p.line(to:NSPoint(x:510,y:n));p.stroke() }

    if let photo=NSImage(contentsOf:imageDir.appendingPathComponent(card.image)) {
        let target=NSRect(x:510,y:0,width:690,height:630), s=photo.size, targetRatio=target.width/target.height
        var source=NSRect(origin:.zero,size:s)
        if s.width/s.height > targetRatio { let nw=s.height*targetRatio;source.origin.x=(s.width-nw)/2;source.size.width=nw }
        else { let nh=s.width/targetRatio;source.origin.y=(s.height-nh)/2;source.size.height=nh }
        photo.draw(in:target,from:source,operation:.sourceOver,fraction:1,respectFlipped:false,hints:[.interpolation:NSImageInterpolation.high])
    }
    orange.setFill();NSRect(x:510,y:0,width:6,height:H).fill()

    let mono=NSFont.monospacedSystemFont(ofSize:22,weight:.bold)
    drawText("COLETIVO",x:62,top:45,width:330,height:30,font:mono,color:orange,kern:3)
    drawText("PILATES",x:62,top:76,width:330,height:30,font:mono,color:orange,kern:3)
    drawText(card.label,x:62,top:188,width:420,height:28,font:NSFont.monospacedSystemFont(ofSize:15,weight:.bold),color:orange,kern:2)
    let titleSize:CGFloat = card.lines.count == 3 ? 48 : 62
    let titleTop:CGFloat = card.lines.count == 3 ? 238 : 252
    for (i,line) in card.lines.enumerated() {
        drawText(line,x:62,top:titleTop+CGFloat(i)*(titleSize+4),width:430,height:titleSize+10,font:NSFont.systemFont(ofSize:titleSize,weight:.semibold),color:ink,kern:-2)
    }
    muted.withAlphaComponent(0.35).setStroke();let divider=NSBezierPath();divider.move(to:NSPoint(x:62,y:H-548));divider.line(to:NSPoint(x:448,y:H-548));divider.stroke()
    drawText("CÓRREGO GRANDE · FLORIANÓPOLIS",x:62,top:566,width:430,height:24,font:NSFont.monospacedSystemFont(ofSize:14,weight:.regular),color:muted,kern:1.5)
    canvas.unlockFocus()
    guard let tiff=canvas.tiffRepresentation, let rep=NSBitmapImageRep(data:tiff), let png=rep.representation(using:.png,properties:[.compressionFactor:0.82]) else { continue }
    let output=outDir.appendingPathComponent(card.slug+".png")
    try png.write(to:output)
    let resize=Process();resize.executableURL=URL(fileURLWithPath:"/usr/bin/sips");resize.arguments=["-z","630","1200",output.path]
    resize.standardOutput=FileHandle.nullDevice;resize.standardError=FileHandle.nullDevice
    try? resize.run();resize.waitUntilExit()
}
print("Rendered \(cards.count) PNG cards at 1200×630.")
