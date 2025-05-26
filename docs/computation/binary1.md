---
title: Introduction to Binary
nextjs:
  metadata:
    title: Introduction to Binary
    description: TBD.
---


## 1. What is Binary?
Computers use a series of switches to represent information and perform computations. Because of this, in order for a computers to understand anything, it is first necessary to create consistent ways of translating data and instructions into patterns that can be represented by "on" and "off" switches. This is the idea of **binary**: encoding information in a way that a computer can understand, where **1** represents a switch that is turned on, and **0** represents a switch that is turned off. 

{% light-switches values=[0, 1] switchWidth=80 center=true label=" " /%}

Encoding information into a binary form may sound kind of abstract, but the concept is fairly simple. For instance, let's say that you and your friend Walter needed to represent the numbers from 0 to 1000 (e.g., 0, 1, 2, 3, 4, ...1000) on a computer. To do this, you would need to create a system to encode each number using a series of switches. Walter proposes that having one switch turned to "on" could represent the number 1, two switches turned to "on" could represent the number 2, three switches turned to "on" could represent the number 3, and so forth. 0 could be represented by no switch at all.

### Walter's System
{% light-switches values=[] label="0" /%}
{% light-switches values=[1] label="1" /%}
{% light-switches values=[1, 1] label="2" /%}
{% light-switches values=[1, 1, 1] label="3" /%}
{% light-switches values=[1, 1, 1, 1] label="4" /%}
{% light-switches values=[1, 1, 1, 1, 1] label="5..." /%}

If you, Walter, and the rest of your team all agree that this is how number encodings should work — and that your encoding scheme can indeed encode all of the numbers between 0-1000 — then you have invented a system of binary that can encode numbers. Great work! However, this may not be *the best* system. Can you think of any problems with encoding numbers in this way?

### Potential Problems with Walter's System:
Over time, you may begin to encounter some problems with Walter's system of binary encodings. For instance:
* If you wanted to represent the number 999,999,999, you would need nearly a billion switches to do it. That's almost 1 GB of memory!
* If zero is represented by having no switches, how do you even know if there is a zero being represented (versus nothing at all)?
* Sometimes you need to represent more than one number. But if each number uses a different number of switches, how would you know when one number ends and the next begins?

You may be starting to appreciate some of the qualities that make some binary encoding systems more efficient that others. Specifically, systems that **conserve memory** (i.e., that minimize the number of switches needed), are **unambiguous**, and that encode similar data **consistently** tend to work better. 


## Representing Numbers in Binary
Luckily, people have spent a lot of time thinking about the best way to encode different kinds of information — even before the existence of computers. Oral and written languages, mathematical representations, and various symbols and signs are all examples of encoding systems that have evolved over many millenia and have stood the test of time. Computers utilize and/or take inspiration from these systems to formally encode various ideas into binary. For instance, to encode numbers, computers utilize a "Base-2" or binary number system, which was conceptualized long ago across a number of different cultures. Modern mathematics tends to use a "Base-10" system. Before delving into binary number systems, let's first review how our standard Base-10 number system works and build from there.

### Base-10 Encodings
fsfdasdasda


### Base-2 (Binary) Encodings
Whether you realize it or not, 

        {% light-switches values=[1, 0, 1, 0, 1, 1, 0, 0] center=true /%}


In this section we'll be focusing on how to represent and manipulate numbers using binary. 

## 2. Converting Between Decimal and Binary


### Binary to Decimal
Some introductory text  for the conversion + a lesson

{% binary-conversion /%}

--- 

### Decimal to Binary
TODO

## 3. Doing Binary Arithmetic
Text text text...

## 4. Other Encodings
Humans have in fact invented many different systems for encoding and decoding different types of information into binary[1] -- not just whole numbers.

---

## References

### Videos
* [Intro to Binary](https://www.youtube.com/watch?v=zDNaUi2cjv4) (2:27)
* [Binary to Decimal Formula](https://www.youtube.com/watch?v=Aw6wd_WE-n8) (1:22)
* [Decimal to Binary Formula](https://www.youtube.com/watch?v=1TxAm9931TE) (2:06)
* [Converting Binary to Decimal](https://www.youtube.com/watch?v=RrJXLdv1i74) (22:15)

### Representing ideas in binary
Just a few examples of how you can use binary to represent letters, colors, and more. 
* [Letters in Binary](https://www.phys.uconn.edu/~rozman/Courses/P2200_13F/downloads/ascii.pdf)
* [Colors represented in 8-bit number channels](https://www.rapidtables.com/web/color/RGB_Color.html)


## Footnotes
[1] Each kind of data can have it's own way of representing information in binary. For instance, letters might use a system called [ASCII](#) or [UTF8](#), and images might use something called a [bitmap](#) -- more on that later.
