//
// InstabugInvoker.m
//

#import <Instabug/Instabug.h>

#import "InstabugInvoker.h"

@implementation InstabugInvoker

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(invoke)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    [Instabug invoke];
  });
}

@end